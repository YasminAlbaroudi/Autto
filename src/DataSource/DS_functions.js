/*global chrome*/
import html2canvas from "html2canvas";
import TabIcon from "@mui/icons-material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinkIcon from "@mui/icons-material/Link";
import CameraIcon from "@mui/icons-material/Camera";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import KeyboardIcon from '@mui/icons-material/Keyboard';

import MyLocationIcon from "@mui/icons-material/MyLocation";
import MouseIcon from "@mui/icons-material/Mouse";
export default {
  //-----------------------------------------Browser-----------------------------------------
  Browser: [
    {
      id: 1,
      name: "New Tab",
      enviroment:"content",
      params: [
        {
          name: "url",
          type: "string",
          value: "",
          default: "www.google.com",
        },
      ],
      description: "Open a new tab in the browser",
      icon: <TabIcon />,
      category: "Browser",
      function: (params) => { 
        params[0].value ||= params[0].default;
        window.open(`https://${params[0].value}`, "_blank");
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Close Current Tab",
      enviroment:"background",
      params: [
      ],
      description: "Close the current tab ",
      icon: <CloseIcon />,
      category: "Browser",
      function: (params) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function (
          tabs
        ) {
          chrome.tabs.remove(tabs[0].id);
        });
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 3,
      name: "Back",
      enviroment:"content",
      params: [],
      description: "Go back in the browser",
      icon: <UndoIcon />,
      category: "Browser",
      function: () => {
        window.history.back();
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 4,
      name: "Forward",
      enviroment:"content",
      params: [],
      description: "Go forward in the browser",
      icon: <RedoIcon />,
      category: "Browser",
      function: () => {
        window.history.forward();
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 11,
      name: "Refresh",
      enviroment:"content",
      params: [],
      description: "Refresh the current page",
      icon: <RefreshIcon />,
      category: "Browser",
      function: () => {
        window.location.reload();
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 12,
      name: "Get Tab URL",
      enviroment:"content",
      params: [],
      description: "Get the URL of the current tab",
      icon: <LinkIcon />,
      category: "Browser",
      function: () => {
        return window.location.href;
      },
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
            name: "Fetched URL",
            val: "",
          },
        ],
      },
    },
    {
      id: 14,
      name: "Switch Tab",
      enviroment:"background",
      params: [
        {
          name: "method",
          type: "string",
          value: "",
          default: "",
        },
        {
          name: "value",
          type: "string",
          value: "",
          default: "",
        },
      ],
      description: "Switch to a specific tab",
      icon: <FlipCameraAndroidIcon />,
      category: "Browser",
      function: (params) => {
        switch (params.method) {
          case "prev":
            chrome.tabs.query({ currentWindow: true }, function (tabs) {
              var activeTab = tabs.filter(function (tab) {
                return tab.active;
              })[0];
              var index = activeTab.index - 1;
              if (index < 0) {
                index = tabs.length - 1;
              }
              chrome.tabs.update(tabs[index].id, { active: true });
            });
            break;
          case "url":
            chrome.tabs.query({ url: params.value }, function (tabs) {
              if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, { active: true });
              }
            });
            break;
          case "next":
            chrome.tabs.query({ currentWindow: true }, function (tabs) {
              var activeTab = tabs.filter(function (tab) {
                return tab.active;
              })[0];
              var index = activeTab.index + 1;
              if (index >= tabs.length) {
                index = 0;
              }
              chrome.tabs.update(tabs[index].id, { active: true });
            });
            break;
          case "index":
            chrome.tabs.query({}, function (tabs) {
              if (params.value < tabs.length) {
                chrome.tabs.update(tabs[params.value].id, { active: true });
              }
            });
            break;
        }
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 15,
      name: "Open in New Window",
      enviroment:"content",
      params: [
        {
          name: "url",
          type: "string",
          value: "",
          default: "",
        },
      ],
      description: "Open a URL in a new window",
      icon: <OpenInNewIcon />,
      category: "Browser",
      function: (params) => {
        window.open(params.url, "_blank");
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    {
      id: 18,
      name: "Active Tab",
      params: [],
      description: "Set the current tab as an active tab",
      icon: <WysiwygOutlinedIcon />,
      category: "General",
      function: (params, context) => {
        context.activeTab = true;
        return Promise.resolve();
      },
      connections: {
        inbound: [{ type: "then", val: "" }],
        outbound: [{ type: "then", val: "" }],
      },
    },
    {
      id: 19,
      name: "Alert",
      enviroment:"content",
      params: [
        {
          name: "message",
          type: "string",
          value: "",
          default: "",
        },
      ],
      description: "Display a message as a browser alert",
      icon: <PriorityHighIcon />,
      category: "Browser",
      function: (params) => {
        alert(params[0].value);
      },
      connections: {
        inbound: [{ type: "then", val: "" }],
        outbound: [{ type: "then", val: "" }],
      },
    },
  ],
  //----------------------------------------TRIGGERS---------------------------------------
  Trigger: [
    {
      id: 5,
      name: "Start",
      params: [],
      description: "Initial workflow block",
      icon: <BoltIcon />,
      category: "Trigger",
      connections: {
        inbound: [],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
  ],

  //----------------------------------------GENERAL---------------------------------------
  General: [
    {
      id: 7,
      name: "Get DOM Element",
      enviroment:"content",
      params: [
        {
          name: "selector",
          type: "string",
          value: "",
          default: "",
        },
      ],
      description: "Get a DOM element",
      icon: <GpsFixedIcon />,
      category: "General",
      function: (params) => {
        return document.querySelector(params.selector);
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    // {
    //   id: 8,
    //   name: "Copy",
    //   params: [
    //     {
    //       name: "text",
    //       type: "string",
    //       value: "",
    //       default: "",
    //     },
    //   ],
    //   description: "Copy text to clipboard",
    //   icon: <ContentCopyIcon />,
    //   category: "General",
    //   function: (params) => {
    //     const el = document.createElement("textarea");
    //     el.value = params.text;
    //     document.body.appendChild(el);
    //     el.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(el);
    //   },
    //   connections: {
    //     inbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //     outbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //   },
    // },
    // {
    //   id: 9,
    //   name: "Paste",
    //   params: [],
    //   description: "Paste text from clipboard",
    //   icon: <ContentPasteIcon />,
    //   category: "General",
    //   function: () => {
    //     const el = document.activeElement;
    //     if (
    //       el instanceof HTMLInputElement ||
    //       el instanceof HTMLTextAreaElement
    //     ) {
    //       navigator.clipboard.readText().then((text) => {
    //         const startPos = el.selectionStart;
    //         const endPos = el.selectionEnd;
    //         const val = el.value;
    //         el.value = val.slice(0, startPos) + text + val.slice(endPos);
    //         el.selectionStart = el.selectionEnd = startPos + text.length;
    //       });
    //     }
    //   },
    //   connections: {
    //     inbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //     outbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //   },
    // },
    {
      id: 16,
      name: "Delay",
      enviroment:"content",
      params: [
        {
          name: "time",
          type: "number",
          value: "",
          default: "",
        },
      ],
      description:
        "Delay the execution of the next action for a specified time",
      icon: <PauseCircleOutlineIcon />,
      category: "General",
      function: (params) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, params.time);
        });
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },
    // {
    //   id: 17,
    //   name: "Notify",
    //   params: [
    //     {
    //       name: "description",
    //       type: "string",
    //       value: "",
    //       default: "",
    //     },
    //   ],
    //   description: "Notify the user with a message",
    //   icon: <NotificationsActiveOutlinedIcon />,
    //   category: "General",
    //   function: (params) => {
    //     // Notify the user with the description
    //     const options = {
    //       body: params.description,
    //     };
    //     new Notification(params.description, options);
    //   },
    //   connections: {
    //     inbound: [{ type: "then", val: "" }],
    //     outbound: [{ type: "then", val: "" }],
    //   },
    // },
  ],
  //----------------------------------------FLOW---------------------------------------
  Flow: [
    {
      id: 18,
      name: "END",
      params: [],
      description: "End the flow",
      icon: <SportsScoreIcon />,
      category: "Flow",
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
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
      enviroment:"content",
      params: [
        {
          name: "placeholder",
          type: "string",
          value: "",
          default: "",
        },
        {
          name :"value",
          type: "string",
          value: "",
          default: "",
        }
      ],
      description: "Set a input field by its placeholder",
      icon: <MyLocationIcon />,
      category: "Web",
      function: (params) => {
        // return document.querySelectorAll(`[placeholder="${params.selector}"]`);
        const inputs= document.querySelectorAll(
          `input[placeholder*="${params[0].value}"]`
        );
        inputs[0].value=params[1].value;
      },

      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            name: "",
            val: "",
          },
        ],
      },
    },
    {
      id: 12,
      name: "Set Input Field By ID",
      enviroment:"content",
      params: [
        {
          name: "id",
          type: "string",
          value: "",
          default: "",
        },
        {
          name :"value",
          type: "string",
          value: "",
          default: "",
        }
      ],
      description: "Set a input field by its id",
      icon: <MyLocationIcon />,
      category: "Web",
      function: (params) => {
        // return document.querySelectorAll(`[placeholder="${params.selector}"]`);
        const inputs= document.querySelectorAll(
          `input[id="${params[0].value}"]`
        );
        inputs[0].value=params[1].value;
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
    

    },

    },
    {
      id: 20,
      name: "Click Element",
      enviroment:"content",
      params: [
        {
          name: "keyword",
          type: "string",
          value: "",
          default: "",
        },
      ],
      description: "Click an element containing a keyword",
      icon: <MouseIcon />,
      category: "Web",
      function: (params) => {
        const clickableElements = document.querySelectorAll(
          `:not([disabled])[onclick], a[href], button:not([disabled]), [role="button"], [type="submit"], [type="image"], [type="button"], [tabindex], div[onclick]`
        );

        for (let i = 0; i < clickableElements.length; i++) {
          const elementText = clickableElements[i].textContent.toLowerCase();

          if (elementText.includes(params[0].value.toLowerCase())) {
            clickableElements[i].click();
            return true;
          }
        }
        return false;
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            val: "",
          },
        ],
      },
    },

    // {
    //   id: 11,
    //   name: "Keyboard Input",
    //   enviroment:"content",
    //   params: [
    //     {
    //       name: "Input Text",
    //       type: "string",
    //       value: "",
    //       default: "",
    //     },
    //   ],
    //   description: "Send keyboard input to the active element",
    //   icon: <KeyboardIcon />,
    //   category: "Web",
    //   function: (params) => {
    //     const clickableElements = document.querySelectorAll(
    //       `:not([disabled])[onclick], a[href], button:not([disabled]), [role="button"], [type="submit"], [type="image"], [type="button"], [tabindex], div[onclick]`
    //     );

    //     for (let i = 0; i < clickableElements.length; i++) {
    //       const elementText = clickableElements[i].textContent.toLowerCase();

    //       if (elementText.includes(params[0].value.toLowerCase())) {
    //         clickableElements[i].click();
    //         return true;
    //       }
    //     }
    //     return false;
    //   },
    //   connections: {
    //     inbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //     outbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //   },
    // },
    // {
    //   id: 13,
    //   name: "Focus input field",
    //   params: [
    //     {
    //       name: "placeholder",
    //       type: "string",
    //       value: "",
    //       default: "",
    //     },
    //   ],
    //   description: "Set a input field by its placeholder",
    //   icon: <MyLocationIcon />,
    //   category: "Web",
    //   function: (params) => {
    //     // return document.querySelectorAll(`[placeholder="${params.selector}"]`);
    //     const inputs= document.querySelectorAll(
    //       `input[placeholder*="${params[0].value}"]`
    //     );
    //     inputs[0].value=params[1].value;
    //   },

    //   connections: {
    //     inbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //     outbound: [
    //       {
    //         type: "then",
    //         val: "",
    //       },
    //     ],
    //   },
    // },
    //  ],
    ],
        Data:[
      {
        id: 1,
        name: "Get metions of a keyword",
        params: [
          {
            name: "Keyword",
            type: "string",
            value: "",
            default: "",
          },
        ],
        description: "Get metions of a keyword",
        icon: <LinkIcon />,
        category: "Data",
        function: () => {
          return window.location.href;
        },
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
              val: "",
            },
          ],
        },
      },
    {
      id: 2,
      name: "Export to CSV",
      enviroment:"content",
      params: [
        {
          name: "File name",
          type: "string",
          value: "",
          default: "Scraped Data",
        },
        {
          name: "Data",
          type: "string",
          value: "",
          default: "",
        }
      ],
      description: "Export scraped data to CSV",
      icon: <LinkIcon />,
      category: "Data",
      function: () => {
        return window.location.href;
      },
      connections: {
        inbound: [
          {
            type: "then",
            val: "",
          },
        ],
        outbound: [
          {
            type: "then",
            name: "",
            val: "",
          },
        ],
      },
    },
  ],
};
