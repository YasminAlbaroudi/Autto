import React from "react";
import SideBar from "./components/SideBar";
import {
  Background,
  Controls,
  ReactFlow,
  SmoothStepEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomComponent from "./components/CustomComponent";
import DS_functions from "../../DataSource/DS_functions";
import { nanoid } from "nanoid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router";
import { getWorkflow, updateWorkflowStructure } from "../../Firebase/Firestore";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";

export default function ExistingWorkFlow(props) {
  // defining a custom node type
  const nodeTypes = React.useMemo(
    () => ({ default: SmoothStepEdge, customComponent: CustomComponent }),
    []
  );
  const [muiDialog, setMuiDialog] = React.useState({
    open: false,
    title: "",
    desc: "",
  });
  const [loading, setLoading] = React.useState(true);
  const {workflowID}=useParams();
  const {currentUser}=useAuth();
  const reactFlowWrapper = React.useRef(null);
  const edgeUpdateSuccessful = React.useRef(true);
  //initializing the nodes and edges
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  const [metaData, setMetaData] = React.useState({});
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const handleUpdateParams = (nodeId, params) => {
    console.log("NODE ID ", nodeId);
    console.log("PARAMS ", params);
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === nodeId) {
          console.warn("FOUND NODE MATCHING BOTH IDS",node.id,nodeId);
          return {
            ...node,
            data: {
              ...node.data,
              function: { ...node.data.function, params: params },
            },
          };
        }
        return node;
      });
    });
  };
  React.useEffect(() => {
    getWorkflow({
        userID: currentUser.uid,
        workflowID: workflowID,
    }).then((data) => {
        console.log("Nodes to be set", JSON.parse(data.nodes));
            
            setNodes(JSON.parse(data.nodes).
            map((node) => {
                return {
                    ...node,
                    data:{
                        ...node.data,
                        function:{
                            ...node.data.function,
                            icon:DS_functions[node.data.function.category].find((func)=>func.id===node.data.function.id).icon
                        },
                        handleUpdateParams:handleUpdateParams
                    }
                }
            }));
            setEdges(JSON.parse(data.edges));
            setMetaData({
              name: data.name,
              description: data.description,
              icon: data.icon,
            });
            setLoading(false);
    });

  }, []);
  console.log("NODES", nodes);
  console.log("EDGES", edges);
  //-------------functions------------------
  //functions to handle the moving of nodesd edges
  const onNodesChange = React.useCallback((changes) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
    console.warn("CHANGES NODES", changes);
  }, []);
  const onEdgesChange = React.useCallback((changes) => {
    console.warn("CHANGES EDGES", changes);
    setEdges((edges) => applyEdgeChanges(changes, edges));
  }, []);
  const onEdgesDelete = React.useCallback((edges) => {
    const edge=edges[0];
    const srcNodeOutbound=nodes.find((node)=>node.id===edge.source).data.function.connections.outbound;
    srcNodeOutbound.forEach((connection) => {
      if (connection.type === "param") {
        setNodes((prevNodes) => {
          return prevNodes.map((node) => {
            if (node.id === edge.target) {
              let nodeParams=node.data.function.params;
              nodeParams=nodeParams.map((param)=>{
                if(param.value===`REF_${edge.source}`){
                  return {...param,value:''}
                }
                return param;
              })
              return {
                ...node,
                data: { ...node.data, passedParams: null, function: { ...node.data.function, params: nodeParams } },  
              };
            }
            return node;
          });
        });  
      }})

  },[nodes,edges]);
  const onDragOver = React.useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  
  const onDrop = React.useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const passed = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const DefinedFunction = DS_functions[passed.category].find((func) => {
        if (func.id === passed.id) {
          return func;
        }
      });
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: nanoid(),
        position,
        type: "customComponent",
        data: {
          label: DefinedFunction.name,
          //deep copy of parameters to localize the changes to the node and remvoe global reference
          function: {...DefinedFunction, params: JSON.parse(JSON.stringify(DefinedFunction.params))},
          handleUpdateParams: handleUpdateParams,
        },
        // DefinedFunction: DefinedFunction,
      };

      setNodes((nds) => nds.concat(newNode));
      checkReference();
      // setNodes((nds)=>nds.add)
    },
    [reactFlowInstance]
  );
  const checkReference=()=>{
    nodes.forEach((node)=>{
      nodes.forEach((node2)=>{
        if(node.function===node2.function){
          console.log("SAME NODE REFERENCE")
        }
      })
    })
  }
  const onConnect = React.useCallback(
    //params is the new edge
    (newEdge) => {
      let tempEdges = [...edges];
      // TODO :: CHECK IF EDGE ALREADY EXISTS
      tempEdges.forEach((edge) => {
        //if the new edge shares a source or a target with any existing edge
        if (edge.source === newEdge.source || edge.target === newEdge.target) {
          //remove the existing edge
          tempEdges = tempEdges.filter(
            (e) => e.id !==edge.id
          );
        }
      });
      newEdge.id = nanoid();
      tempEdges.push(newEdge);
      setEdges(tempEdges);
      //done with adding the new edge
      //below is everything related to passing a param through the newly added edge
      const sourceNode = nodes.find((node) => {
        if (node.id === newEdge.source) {
          return node;
        }
      });
      const sourceOutbound = sourceNode.data.function.connections.outbound;
      sourceOutbound.forEach((connection) => {
        if (connection.type === "param") {
          connection.nodeID = sourceNode.id;
          setNodes((prevNodes) => {
            return prevNodes.map((node) => {
              if (node.id === newEdge.target) {
                return {
                  ...node,
                  data: { ...node.data, passedParams: connection },
                };
              }
              return node;
            });
          });
        }
      });
    },
    [edges, nodes]
  );

  const save = () => {
    console.log("RUNNING");
    console.log("NODES", nodes);
    console.log("EDGES", edges);
    if (nodes.length < 3) {
      setMuiDialog({
        open: true,
        title: "Incomplete Workflow",
        desc: "Please add one trigger , one function and one end node",
      });
      return;
    }
    const trigger = nodes.filter(
      (node) => node.data.function.category === "Trigger"
    );
    console.log("TRIGGER", trigger);
    if (trigger.length === 0) {
      setMuiDialog({
        open: true,
        title: "No Trigger",
        desc: "Please add a trigger to the workflow",
      });
      return;
    }
    if (trigger.length > 1) {
      setMuiDialog({
        open: true,
        title: "Multiple Triggers",
        desc: "Only one trigger allowed per workflow",
      });
      return;
    }
    const numberOfConnections = nodes.reduce(
      (acc, node) => acc + node.data.function.connections.outbound.length,
      0
    );
    if (numberOfConnections !== edges.length) {
      setMuiDialog({
        open: true,
        title: "Incomplete Workflow",
        desc: "Please connect all the nodes",
      });
      //fix if some nodes can have multiple connections
      return;
    }
    setUpdateLoading(true);
    updateWorkflowStructure({
        userID: currentUser.uid,
        workflowID: workflowID,
        nodes:JSON.stringify(nodes),
        edges:JSON.stringify(edges)
    }).then((res)=>{
        setUpdateLoading(false);
        setMuiDialog({
            open: true,
            title: "Workflow Saved",
            desc: "Workflow saved successfully",
        });
    });
    
  };
  const handleCloseDialog = () => {
    setMuiDialog((prevDialog) => {
      return { ...prevDialog, open: false };
    });
  };


  return (
    <>
    <Loading open={loading} />
      <Dialog
        open={muiDialog.open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontWeight="bold">
          {muiDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontWeight="600">
            {muiDialog.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="secondary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <NavBar bgColor="#484848" color="primary" opacity="0.7" logoLight={true}/>
      <div style={{ display: "flex" }}>
        <SideBar save={save} loading={updateLoading} metaData={metaData} workflowID={workflowID}/>
        <div style={{ height: "100vh", width: "90%", marginLeft: "10%" }}>
          <Flow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgesDelete={onEdgesDelete}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            reactFlowWrapper={reactFlowWrapper}
            setReactFlowInstance={setReactFlowInstance}
            nodeTypes={nodeTypes}
          />
        </div>
      </div>
    </>
  );
}

const Flow = (props) => {
  return (
    <div style={{ height: "100%" }} ref={props.reactFlowWrapper}>
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onEdgesDelete={props.onEdgesDelete}
        onDrop={props.onDrop}
        onDragOver={props.onDragOver}
        onConnect={props.onConnect}
        onInit={props.setReactFlowInstance}
        nodeTypes={props.nodeTypes}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
