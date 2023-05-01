/*global chrome*/
import TabIcon from "@mui/icons-material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinkIcon from "@mui/icons-material/Link";
import BoltIcon from "@mui/icons-material/Bolt";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MouseIcon from "@mui/icons-material/Mouse";
export default {
  //-----------------------------------------Browser-----------------------------------------
  Browser: [
    {
      id: 1,
      name: "New Tab",
      params: [
        {
          name: "url",
          description:"The url to open in the new tab",
          default: "www.google.com",
        },
      ],
      description: "This function will open a new tab in the browser with the url provided in the parameter or the default value if no parameter is provided",
      icon: <TabIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 2,
      name: "Close Current Tab",
      params: [],
      description: "This function will close the currently active and focused tab in the browser",
      icon: <CloseIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 3,
      name: "Back",
      params: [],
      description: "This function will go back in the browser history of the current tab if there is a previous page to go back to",
      icon: <UndoIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 4,
      name: "Forward",
      params: [],
      description: "This function will go forward in the browser history of the current tab if there is a page to go forward to",
      icon: <RedoIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 11,
      name: "Refresh",
      params: [],
      description: "This function will refresh the current tab in the browser",
      icon: <RefreshIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 12,
      name: "Get Tab URL",
      params: [],
      description: "This function will return the url of the currently active tab in the browser",
      icon: <LinkIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "param",
            name: "Fetched URL",
            description: "The url of the currently active tab in the browser",
          },
        ],
      },
    },
    {
      id: 14,
      name: "Switch Tab",
      
      params: [
        {
          name: "method",
          type: "string",
          description:"This determines which method to use to switch tabs. The options are: prev, next, url, index",
          default: "",
        },
        {
          name: "value",
          type: "string",
          description:"This is to be used if the method is url or index. If the method is url, then this is the url of the tab to switch to. If the method is index, then this is the index of the tab to switch to",   
          default: "",
        },
      ],
      description: "Switch to a specific tab in the currently active window",
      icon: <FlipCameraAndroidIcon />,
      connections: {
        inbound: [
          {
            type: "then",
          },
        ],
        outbound: [
          {
            type: "then",
          },
        ],
      },
    },
    {
      id: 15,
      name: "Open in New Window",
      params: [
        {
          name: "url",
          type: "string",
          description:"The url to open in the new window",
          default: "www.google.com",
        },
      ],
      description: "This function will open a new window in the browser with the url provided in the parameter or the default value if no parameter is provided",
      icon: <OpenInNewIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 19,
      name: "Alert",
      
      params: [
        {
          name: "message",
          type: "string",
          description:"The message to display in the alert",
          default: "",
        },
      ],
      description: "This function will display an alert with the message provided in the parameter or the default value if no parameter is provided",
      icon: <PriorityHighIcon />,
      connections: {
        inbound: [{ type: "then",  }],
        outbound: [{ type: "then",  }],
      },
    },
  ],
  //----------------------------------------TRIGGERS---------------------------------------
  Trigger: [
    {
      id: 5,
      name: "Start",
      params: [],
      description: "This is the starting block of the workflow. It is required for every workflow and can only be used once per workflow",
      icon: <BoltIcon />,
      connections: {
        inbound: [],
        outbound: [
          {
            type: "then",
          },
        ],
      },
    },
  ],

  //----------------------------------------GENERAL---------------------------------------
  General: [
    {
      id: 16,
      name: "Delay",
      params: [
        {
          name: "time",
          type: "number",
          description:"The time to delay the execution of the next action in milliseconds",
          default: "100",
        },
      ],
      description:
        "This function will delay the execution of the next action in the workflow by the time provided in the parameter or the default value if no parameter is provided",
      icon: <PauseCircleOutlineIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
  ],
  //----------------------------------------FLOW---------------------------------------
  Flow: [
    {
      id: 18,
      name: "END",
      params: [],
      description: "This is the ending block of the workflow. It is required for every workflow and can only be used once per workflow",
      icon: <SportsScoreIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [],
      },
    },
  ],
  //----------------------------------------Web interaction---------------------------------------
  Web: [
    {
      id: 10,
      name: "Set Input Field",
      params: [
        {
          name: "placeholder",
          type: "string",
          description:"This is generally the placeholder of the input field to set, but it can also be the name, id or any other attribute used for identification of the input field",
          default: "",
        },
        {
          name :"value",
          type: "string",
          description:"The value to set the input field to",
          default: "",
        }
      ],
      description: "This function will set the value of an input field to the value provided in the parameter or the default value if no parameter is provided",
      icon: <MyLocationIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    {
      id: 20,
      name: "Click Element",
      params: [
        {
          name: "keyword",
          type: "string",
          description:"This is generally the text of the button/element to click, but it can also be the name, id or any other attribute used for identification of the element",
          default: "",
        },
      ],
      description: "This function will click on an element with the text provided in the parameter or the default value if no parameter is provided",
      icon: <MouseIcon />,
      connections: {
        inbound: [
          {
            type: "then",
            
          },
        ],
        outbound: [
          {
            type: "then",
            
          },
        ],
      },
    },
    ],
    Data:[
        {
          id: 1,
          name: "Get mentions of a keyword",
          params: [
            {
              name: "Keyword",
              type: "string",
              description:"The keyword to search for",
              default: "",
            },
          ],
          description: "This function will get all the mentions of a keyword currently rendered on the page. This function is to be used in conjuction with the 'Open in New Window' function.",
          icon: <LinkIcon />,
          connections: {
            inbound: [
              {
                type: "then",
                val: "",
              },
            ],
            outbound: [
              {
                type: "param",
                name: "Fetched Data",
                description: "The data fetched by the function",
              },
            ],
          },
        },
      {
        id: 2,
        name: "Export to CSV",
        params: [
          {
            name: "File name",
            type: "string",
            description:"The name of the file to be downloaded containing the data",
            default: "Scraped Data",
          },
          {
            name: "Data",
            type: "string",
            description:"The data to be exported to CSV. This is generally the output of the 'Get mentions of a keyword' function",
            default: "",
          }
        ],
        description: "This function will export the data provided in the parameter to a CSV file with the name provided in the name parameter",
        icon: <LinkIcon />,
        connections: {
          inbound: [
            {
              type: "then",
            },
          ],
          outbound: [
            {
              type: "then",
            },
          ],
        },
      },
    ],
};
