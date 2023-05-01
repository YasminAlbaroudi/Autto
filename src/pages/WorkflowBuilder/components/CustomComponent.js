import React from "react";
import { Handle, Position } from "reactflow";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
export default function CustomComponent(props) {
  //function to update the value of displayed parameters
  const updateParamValue = (value, index) => {
    let newParams = [...props.data.function.params];
    newParams[index].value = value;
    props.data.handleUpdateParams(props.id, newParams);
  };
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {props.data.function.icon}
          {props.data.function.name}
        </Typography>
        <Typography variant="body2">
          {props.data.function.description}
        </Typography>
        {props.data.function.connections.inbound.map((connection, index) => {
          return (
            <Handle
              type="target"
              position={Position.Left}
              key={index}
              style={{
                width: "1rem",
                height: "1rem",
                transform: "translate(-50%, -50%)",
                background: "#681897",
                outline: "solid 3px grey",
              }}
            />
          );
        })}
        {props.data.function.connections.outbound.map((connection, index) => {
          return (
            <Handle
              type="source"
              position={Position.Right}
              key={index}
              style={{
                width: "1rem",
                height: "1rem",
                transform: "translate(50%, -50%)",
                background: "#681897",
                outline: "solid 3px grey",
              }}
            />
          );
        })}
        {props.data.passedParams && (
          <Chip label={props.data.passedParams.name} />
        )}
        {!props.data.passedParams &&
          props.data.function.params.map((param, index) => {
            return (
              <TextField
                key={index}
                id={param.name}
                name={param.name}
                label={param.name}
                placeholder={`${param.name}, default value: ${param.default}`}
                value={param.value}
                onChange={(e) => {
                  updateParamValue(e.target.value, index);
                }}
                sx={{ width: "100%", marginTop: "1rem" }}
              />
            );
          })}

        {props.data.passedParams &&
          props.data.function.params.map((param, index) => {
            return (
              <Autocomplete
                multiple
                key={index}
                id={param.name}
                options={[{label: props.data.passedParams.name, id: props.data.passedParams.nodeID}]}
                freeSolo
                onChange={(e) => {
                  if(e.target.role==="option"){
                  updateParamValue(`REF_${props.data.passedParams.nodeID}`, index);
                }
                else{
                  updateParamValue("", index);
                }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="contained"
                      label={option.label}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={index}
                    id={param.name}
                    name={param.name}
                    label={param.name}
                    // placeholder={`${param.name}, default value: ${param.default}`}
                    sx={{ width: "100%", marginTop: "1rem" }}
                    onChange={(e) => {
                      updateParamValue(e.target.value, index);
                    }}
                    value={param.value}
                  />
                )}
              />
            );
          })}
      </CardContent>
    </Card>
  );
}
//CUTE PEOPLE PARKING
