import { React} from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Icon, Collapsible, CollapsibleItem } from "react-materialize";
const CollapsibleMarkdown = ({ header, description }) => {
  return (
     <Collapsible accordion>
     <CollapsibleItem
       expanded={false}
       header={header}
       icon={<Icon>more_horiz</Icon>}
     >
       <ReactMarkdown plugins={[gfm]} children={description} />
     </CollapsibleItem>
   </Collapsible>
  );
};
export default CollapsibleMarkdown;