import React, { useState, useEffect, CSSProperties } from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge, NodeProps, Position, useNodesState, useEdgesState } from 'react-flow-renderer';
import styled from 'styled-components';

// Styled component for the container
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`;

// Interfaces for the node and edge data
interface NodeData {
  label: string;
}

interface NodePosition {
  x: number;
  y: number;
}

interface CustomNode extends Node<NodeData> {
  position: NodePosition;
}

interface CustomEdge extends Edge {}

interface HierarchyNode {
  name: string;
  children?: HierarchyNode[];
}

// Constants
const MAX_NODES = 10; // Maximum number of nodes to display
const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;
const HORIZONTAL_SPACING = 220;
const VERTICAL_SPACING = 100;

// Custom node style
const customNodeStyle: CSSProperties = {
  borderRadius: '10px',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  wordBreak: 'break-word',
  width: `${NODE_WIDTH}px`,
  height: `${NODE_HEIGHT}px`,
  cursor: 'pointer',
  fontSize: '14px',
  overflow: 'hidden',
};

// Custom node component
const CustomNodeComponent: React.FC<NodeProps<NodeData>> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={customNodeStyle} onClick={handleClick}>
      {data.label}
    </div>
  );
};

// Register custom node type
const nodeTypes = {
  customNode: CustomNodeComponent,
};

// Function to build a node object
const buildNode = (id: string, name: string, position: NodePosition): CustomNode => ({
  id,
  type: 'customNode',
  data: { label: name },
  position,
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
});

// Function to build an edge object
const buildEdge = (id: string, source: string, target: string): CustomEdge => ({
  id,
  source,
  target,
  type: 'smoothstep',
});

// Function to convert hierarchical data to flow data with a tree layout
const convertToFlowData = (root: HierarchyNode) => {
  const nodes: CustomNode[] = [];
  const edges: CustomEdge[] = [];
  let nodeIdCounter = 0;
  let edgeIdCounter = 0;

  const traverse = (node: HierarchyNode, depth: number, index: number, parentId?: string) => {
    if (nodes.length >= MAX_NODES) return;

    const nodeId = `node-${nodeIdCounter++}`;
    const position = {
      x: depth * HORIZONTAL_SPACING,
      y: index * VERTICAL_SPACING,
    };
    nodes.push(buildNode(nodeId, node.name, position));

    if (parentId) {
      edges.push(buildEdge(`edge-${edgeIdCounter++}`, parentId, nodeId));
    }

    if (node.children) {
      node.children.forEach((child, childIndex) => {
        traverse(child, depth + 1, index + childIndex, nodeId);
      });
    }
  };

  traverse(root, 0, 0);
  return { nodes, edges };
};

// Function to fetch hierarchy data from the server
const fetchHierarchyData = async (): Promise<HierarchyNode> => {
  const response = await fetch('/conceptHierarchy.json');
  if (!response.ok) {
    throw new Error('Error fetching JSON');
  }
  return response.json();
};

// HierarchyTree component
const HierarchyTree: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const processHierarchyData = async () => {
      try {
        const data = await fetchHierarchyData();
        const { nodes, edges } = convertToFlowData(data);
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        console.error(error);
      }
    };

    processHierarchyData();
  }, []);

  return (
    <Container>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        style={{ background: '#f9f9f9' }}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Container>
  );
};

export default HierarchyTree;