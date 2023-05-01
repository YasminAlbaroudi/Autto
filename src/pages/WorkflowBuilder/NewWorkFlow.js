import React from "react";
import SideBar from "./components/SideBar";
import {
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlow,
  addEdge,
  updateEdge,
  SmoothStepEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomComponent from "./components/CustomComponent";
import DS_functions from "../../DataSource/DS_functions";
import { nanoid } from "nanoid";
import DS_icons from "../../DataSource/DS_icons";
import { useAuth } from "../../Context/AuthContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { storeWorkflow } from "../../Firebase/Firestore";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";

export default function NewWorkFlow(props) {
  // defining a custom node type
  const {currentUser}=useAuth();
  const nodeTypes = React.useMemo(
    () => ({ default: SmoothStepEdge, customComponent: CustomComponent }),
    []
  );
  const [muiDialog, setMuiDialog] = React.useState({
    open: false,
    title: "",
    desc: "",
  });
  const [savingDialog, setSavingDialog] = React.useState({
    open: false,
    name: "",
    desc: "",
    icon:"world",
  });
  const [loading,setLoading]=React.useState(false);
  const reactFlowWrapper = React.useRef(null);
  const edgeUpdateSuccessful = React.useRef(true);
  //initializing the nodes and edges
  const [nodes, setNodes] = React.useState([]);
  // console.log(nodes.);
  const [edges, setEdges] = React.useState([]);
  // const [edges,setEdges,onEdgesChange]=useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  console.log("NODES", nodes);
  console.log("EDGES", JSON.stringify(edges));
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
    setSavingDialog(prevSavingDialog => {
      return { ...prevSavingDialog, open: true }; 
    })
    
  };
  const handleCloseDialog = () => {
    setMuiDialog((prevDialog) => {
      return { ...prevDialog, open: false };
    });
  };
const handleCloseSavingDialog = () => {
    setSavingDialog((prevDialog) => {
      return { ...prevDialog, open: false };
    });
};
const handleSaving  = async () => {
  setLoading(true);
   storeWorkflow(
    {userID:currentUser.uid
      ,name:savingDialog.name
      ,desc:savingDialog.desc
      ,icon:savingDialog.icon
      ,nodes:JSON.stringify(nodes)
      ,edges:JSON.stringify(edges)
    }
  ).then((id)=>{
    window.location.href=`/Flow/${id}`
  });
}

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
      <Dialog
        open={savingDialog.open}
        onClose={handleCloseSavingDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontWeight="bold">
          Save
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontWeight="600" marginBottom="1rem">
            Please enter workflow details
          </DialogContentText>
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Icon</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={savingDialog.icon}
    label="Icon"
    onChange={(e)=>{
      setSavingDialog((prevSavingDialog) => {
        return { ...prevSavingDialog, icon: e.target.value };
      });
    }}
  >
    {Object.keys(DS_icons).map((icon)=>{
      return <MenuItem value={icon}>{DS_icons[icon]}</MenuItem>
    })}
  </Select>
</FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workflow Name"
            type="text"
            fullWidth
            value={savingDialog.name}
            onChange={(e) => {
              setSavingDialog((prevSavingDialog) => {
                return { ...prevSavingDialog, name: e.target.value };
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Workflow Description"
            type="text"
            fullWidth
            multiline={true}
            minRows={2}
            value={savingDialog.desc}
            onChange={(e) => {
              setSavingDialog((prevSavingDialog) => {
                return { ...prevSavingDialog, desc: e.target.value };
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSavingDialog} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={handleSaving} variant="contained" color="secondary">Save</Button>
        </DialogActions>

      </Dialog>
      <NavBar bgColor="#484848" color="primary" opacity="0.7" logoLight={true}/>
      <div style={{ display: "flex" }}>

        <SideBar save={save}  />
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
      </ReactFlow>
    </div>
  );
};
