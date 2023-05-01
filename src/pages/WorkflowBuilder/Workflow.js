import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  SmoothStepEdge,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback, useRef } from "react";
import React from "react";
import Box from "@mui/material/Box";
import SideBar from "./components/SideBar";
import DS_functions from "../../DataSource/DS_functions";
import CustomComponent from "./components/CustomComponent";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

// the export function
export default function Workflow() {
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodeTypes = React.useMemo(
    () => ({ default: SmoothStepEdge, customComponent: CustomComponent }),
    []
  );
  console.log("NODES ", nodes);
  console.log("EDGES ", edges);
  const testRun = () => {
    console.log("NODES ", nodes);
    console.log("EDGES ", edges);
    nodes.map((node) => {
      console.log("NODE ", node);
      node.DefinedFunction.function();
      //wait for 1 second
      setTimeout(function () {
        node.type.function();
      }, 1000);
    });
  };
  const onNodesChange = useCallback(
    (changedNode) => {
      console.log("NODES CHANGED", changedNode);
      setNodes((prevNodes) => {
        const unchangedNodes = prevNodes.filter((node) => {
          if (node.id !== changedNode.id) {
            return node;
          }
        });
        const prevChangedNode = prevNodes.find((node) => {
          if (node.id === changedNode.id) {
            return node;
          }
        });
        return unchangedNodes.concat({ ...prevChangedNode, ...changedNode });
      });
    },
    [nodes]
  );
  const onEdgesChange = useCallback((edges) => {
    console.log("EDGES CHANGED", edges);
  }, []);
  const onConnect = useCallback(
    (params) => {
      edges.map((edge) => {
        if (edge.source === params.source) {
          alert("You can only have one connection per node 1");
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          return;
        }
        if (edge.target === params.target) {
          alert("You can only have one connection per node 2");
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          return;
        }
      });

      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
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
      console.log("DEFINED FUNCTION ", DefinedFunction);
      const newNode = {
        id: getId(),
        position,
        type: "customComponent",
        data: {
          label: DefinedFunction.name,
          function: DefinedFunction,
          handleUpdateParams: handleUpdateParams,
        },
        DefinedFunction: DefinedFunction,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  // const handleUpdateParams = (nodeId, params) => {
  //   console.log("CURRENT NODES", nodes);
  //   const prevNode = nodes.find((node) => node.id === nodeId);
  //   console.log("PREV NODE ", prevNode);
  //   const newNode = {
  //     ...prevNode,
  //     data: {
  //       ...prevNode.data,
  //       function: {
  //         ...prevNode.data.function,
  //         params: params,
  //       },
  //     },
  //   };
  //   console.log("NEW NODE ", newNode);
  //   setNodes((prevNodes) => {
  //     const newNodes = prevNodes.map((node) => {
  //       if (node.id === nodeId) {
  //         return newNode;
  //       }
  //       return node;
  //     });
  //     return newNodes;
  //   });
  // };
  console.log("NODES BEFORE FUNCTION BLOCK", nodes);
  function handleUpdateParams(nodeId, params) {
    console.log("CURRENT NODES", nodes);
    const prevNode = nodes.find((node) => node.id === nodeId);
    console.log("PREV NODE ", prevNode);
    const newNode = {
      ...prevNode,
      data: {
        ...prevNode.data,
        function: {
          ...prevNode.data.function,
          params: params,
        },
      },
    };
    console.log("NEW NODE ", newNode);
    setNodes((prevNodes) => {
      const newNodes = prevNodes.map((node) => {
        if (node.id === nodeId) {
          return newNode;
        }
        return node;
      });
      return newNodes;
    });
  }
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlowProvider>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, padding: 0 }}
          height="100vh"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            edgeTypes={{ default: SmoothStepEdge }}
            style={{ backgroundColor: "#121212" }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background size="1.5" gap="30" variant="dots" color="#ededed" />
            <Controls />
            <MiniMap nodeStrokeWidth={5} zoomable pannable />
          </ReactFlow>
        </Box>
      </ReactFlowProvider>
      <SideBar run={testRun} />
    </div>
  );
}
