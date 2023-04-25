var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links6
});
var import_react6 = require("@remix-run/react");

// app/components/layout/header/header.tsx
var import_react2 = require("@remix-run/react");

// app/components/layout/header/header.css
var header_default = "/build/_assets/header-TZP4GST4.css";

// app/components/layout/header/header.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Header() {
  let location = (0, import_react2.useLocation)(), revalidator = (0, import_react2.useRevalidator)(), handleRevalidate = () => {
    revalidator.revalidate();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "header", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "header__logo", children: "Hacker News" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      location.pathname !== "/" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { title: "Go Back", type: "link" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { title: "Refresh Data", type: "button", revalidate: handleRevalidate })
    ] })
  ] });
}
function links() {
  return [{ rel: "stylesheet", href: header_default }];
}

// app/components/stories/story-list/storyList.tsx
var import_react3 = require("@remix-run/react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function StoryList({ stories }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { children: stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Link, { to: String(story.id), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    StoryListItem,
    {
      title: story.title,
      rating: story.score,
      author: story.by,
      date: story.time,
      descendants: story.descendants,
      id: story.id
    }
  ) }, story.id)) });
}

// app/utils/convertTimestamp.ts
function timestampToDate(timestamp) {
  let date = new Date(timestamp * 1e3), localDate = new Date(
    date.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
  ), localHours = localDate.getHours().toString().padStart(2, "0"), localMinutes = localDate.getMinutes().toString().padStart(2, "0");
  return `${localHours} hours ${localMinutes} minutes`;
}

// app/components/stories/story-list-item/storyListItem.css
var storyListItem_default = "/build/_assets/storyListItem-L5HGIOFB.css";

// app/components/stories/story-list-item/storyListItem.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function StoryListItem({
  title,
  rating,
  author,
  descendants,
  date
}) {
  let convertedDate = timestampToDate(date);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: "story-list-item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "story-list-item__author", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
        "Posted by: ",
        author
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
        convertedDate,
        " ago"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "story-list-item__title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "story-list-comments", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
        descendants,
        " comments"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "story-list-item__rating", children: [
        "rating ",
        rating
      ] })
    ] })
  ] });
}
function links2() {
  return [{ rel: "stylesheet", href: storyListItem_default }];
}

// app/components/comments/comments-list/commentsList.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function CommentsList({ comments }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CommentListItem, { comment }, comment.id)) });
}

// app/components/comments/comment-list-item/commentListItem.tsx
var import_react4 = require("react");

// app/utils/http.ts
async function http(url) {
  let response = await fetch(url);
  if (!response.ok)
    throw new Error("Response Error:" + response.text);
  return await response.json();
}

// app/config.ts
var API_URL = "https://hacker-news.firebaseio.com/v0", STORIES_TYPE = "topstories";

// app/utils/htmlConvert.ts
var import_html_to_text = require("html-to-text");
function convertComment(htmlText) {
  return (0, import_html_to_text.convert)(htmlText);
}

// app/components/comments/comment-list-item/commentListItem.css
var commentListItem_default = "/build/_assets/commentListItem-TXKOG2GL.css";

// app/components/comments/comment-list-item/commentListItem.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function CommentListItem({ comment }) {
  let [childComments, setChildComments] = (0, import_react4.useState)([]), [showChildren, setShowChildren] = (0, import_react4.useState)(!1);
  (0, import_react4.useEffect)(() => {
    async function fetchChildComments() {
      if ("kids" in comment && comment.kids)
        try {
          let promises = comment.kids.map((id) => http(`${API_URL}/item/${id}.json`)), children = await Promise.all(promises);
          setChildComments(children);
        } catch (err) {
          console.log(err);
        }
    }
    showChildren && fetchChildComments();
  }, [comment, showChildren]);
  function handleClick() {
    setShowChildren(!showChildren);
  }
  let convertedComment = convertComment(comment.text);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { className: "comment-list-item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "comment-list-item__text", children: convertedComment }),
      "kids" in comment && comment.kids && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: "comment-list-item__button", onClick: handleClick, children: [
        showChildren ? "Hide" : "Show",
        " ",
        comment.kids.length,
        " more"
      ] })
    ] }),
    showChildren && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChildCommentsList, { comments: childComments })
  ] });
}
function links3() {
  return [{ rel: "stylesheet", href: commentListItem_default }];
}

// app/components/comments/child-comments-list/childCommentsList.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function ChildCommentsList({ comments }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChildCommentListItem, { comment }, comment.id)) });
}

// app/components/comments/child-comment-list-item/childCommentListItem.css
var childCommentListItem_default = "/build/_assets/childCommentListItem-EB3652C4.css";

// app/components/comments/child-comment-list-item/childCommentListItem.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function ChildCommentListItem({ comment }) {
  let convertedComment = convertComment(comment.text);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "child-comment", children: convertedComment });
}
function links4() {
  return [{ rel: "stylesheet", href: childCommentListItem_default }];
}

// app/components/ui/button/button.tsx
var import_react5 = require("@remix-run/react");

// app/components/ui/button/button.css
var button_default = "/build/_assets/button-FACN3OIM.css";

// app/components/ui/button/button.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function Button({ title, type, revalidate }) {
  return type === "button" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { onClick: revalidate, className: "button", children: title }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react5.Link, { to: "/", className: "button button-link", children: title });
}
function links5() {
  return [{ rel: "stylesheet", href: button_default }];
}

// app/styles/main.css
var main_default = "/build/_assets/main-LMYSPOGT.css";

// app/root.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Header, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react6.LiveReload, {})
    ] })
  ] });
}
function links6() {
  return [{ rel: "stylesheet", href: main_default }, ...links(), ...links5()];
}

// app/routes/handle-validate.tsx
var handle_validate_exports = {};
__export(handle_validate_exports, {
  action: () => action
});
var action = () => null;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  links: () => links7,
  loader: () => loader,
  meta: () => meta
});
var import_react7 = require("react"), import_react8 = require("@remix-run/react"), import_node2 = require("@remix-run/node");

// app/news.server.ts
async function getNewStories() {
  let url = `${API_URL}/${STORIES_TYPE}.json`, promises = (await http(url)).slice(0, 100).map((id) => http(`${API_URL}/item/${id}.json`));
  return await Promise.all(promises);
}
async function getStory(id) {
  let url = `${API_URL}/item/${id}.json`;
  return await http(url);
}
async function getComments(commentIds) {
  let promises = commentIds.map((id) => http(`${API_URL}/item/${id}.json`));
  return await Promise.all(promises);
}

// app/utils/sortByData.ts
function sortByDateDescending(arr) {
  return arr.sort((a, b) => {
    let timeA = a.time || 0;
    return (b.time || 0) - timeA;
  });
}

// app/styles/home.css
var home_default = "/build/_assets/home-QBGH4K77.css";

// app/routes/_index.tsx
var import_jsx_runtime11 = require("react/jsx-runtime"), meta = () => [{ title: "Hacker News" }], loader = async () => (0, import_node2.json)({
  data: await getNewStories()
});
function Index() {
  let revalidator = (0, import_react8.useRevalidator)(), handleRevalidate = () => {
    revalidator.revalidate();
  }, { data } = (0, import_react8.useLoaderData)();
  (0, import_react7.useEffect)(() => {
    let intervalId = setInterval(() => {
      handleRevalidate();
    }, 6e4);
    return () => clearInterval(intervalId);
  }, []);
  let sortedData = sortByDateDescending(data || []);
  return sortedData.length < 1 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: "Something went wrong... No data..." }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("main", { className: "home", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(StoryList, { stories: sortedData }) });
}
function links7() {
  return [{ rel: "stylesheet", href: home_default }, ...links2()];
}

// app/routes/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => StorySlug,
  links: () => links8,
  loader: () => loader2,
  meta: () => meta2
});
var import_node3 = require("@remix-run/node"), import_react9 = require("@remix-run/react");

// app/styles/slug.css
var slug_default = "/build/_assets/slug-62YRNADF.css";

// app/routes/$slug.tsx
var import_jsx_runtime12 = require("react/jsx-runtime"), meta2 = () => [{ title: "Hacker News" }], loader2 = async ({ params }) => {
  if (!params.slug)
    throw new Response("Not Found", { status: 404 });
  let story = await getStory(params.slug), commentIds = story.kids || [], comments = await getComments(commentIds);
  return (0, import_node3.json)({
    story,
    comments
  });
};
function StorySlug() {
  let { story, comments } = (0, import_react9.useLoaderData)(), convertedDate = timestampToDate(story.time);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("main", { className: "slug", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "slug__author", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
        "Posted by: ",
        story.by
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
        convertedDate,
        " minutes ago"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { className: "slug__title", children: story.title }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("a", { href: story.url, children: story.url }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "slug__comments", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
      story.descendants,
      " comments"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CommentsList, { comments }) })
  ] });
}
function links8() {
  return [
    { rel: "stylesheet", href: slug_default },
    ...links3(),
    ...links4()
  ];
}
function ErrorBoundary() {
  let error = (0, import_react9.useRouteError)();
  if ((0, import_react9.isRouteErrorResponse)(error))
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { children: "Oops" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
        "Status: ",
        error.status
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: error.data.message })
    ] });
  let errorMessage = "Unknown error";
  return error instanceof Error && (errorMessage = error.message), /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { children: "Uh oh ..." }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "Something went wrong." }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("pre", { children: errorMessage }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react9.Link, { to: "/", children: "Back" })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "a54c5dac", entry: { module: "/build/entry.client-SWWZVWDO.js", imports: ["/build/_shared/chunk-BLG7ICDK.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-KSKWGHVZ.js", imports: ["/build/_shared/chunk-4WL5SQZA.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$slug": { id: "routes/$slug", parentId: "root", path: ":slug", index: void 0, caseSensitive: void 0, module: "/build/routes/$slug-CYQF5MOW.js", imports: ["/build/_shared/chunk-R7NETCL5.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-7VSTXET5.js", imports: ["/build/_shared/chunk-R7NETCL5.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/handle-validate": { id: "routes/handle-validate", parentId: "root", path: "handle-validate", index: void 0, caseSensitive: void 0, module: "/build/routes/handle-validate-X4IXUUPG.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-A54C5DAC.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/handle-validate": {
    id: "routes/handle-validate",
    parentId: "root",
    path: "handle-validate",
    index: void 0,
    caseSensitive: void 0,
    module: handle_validate_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/$slug": {
    id: "routes/$slug",
    parentId: "root",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
