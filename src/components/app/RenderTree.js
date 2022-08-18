import TreeItem from '@mui/lab/TreeItem';

export const RenderTree = (element) => {
       
    return (
        
      <TreeItem 
          key={element.id}
          nodeId={element.id}
          label={element.name}
      >
          {Array.isArray(element.nodes)
          ? element.nodes.map((node) => RenderTree(node))
          : null}
      </TreeItem>
           
    );
}