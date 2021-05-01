/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap");
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, button, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  /* font: inherit; */
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  font-family: "Rubik", Arial, sans-serif;
  color: #303030;
}
/* INSETS */
/* box-shadow:0px 0px 0px 1px #0e131809 inset; */
/* //////////// STRUCTURE ///////////// */
/* BODY */
body {
  background-color: #fefefe;
}
/* HEADER */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 12px 16px 12px 36px;
}
header .button-container {
  display: flex;
}
/* MAIN */
main {
  max-width: 100vw;
  max-height: calc(100vh - 72px);
  background-color: #fafafa;
  position: relative;
  box-shadow: 0px 0px 0px 1px #0e131809 inset;
  /* filter: drop-shadow(0 0 4px #e5e5e5) */
}
#tasks, #content {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 72px);
  /* z-index: 3; */
  background-color: #fafafa;
  box-shadow: 0px 0px 0px 1px #0e131809 inset;
  display: flex;
  /* filter: drop-shadow(0 0 2px #e5e5e5) */
  overflow: scroll hidden;
}
#tasks {
  max-width: 100%;
  -ms-scroll-snap-type: x mandatory;
      scroll-snap-type: x mandatory;
}
.tab {
  position: absolute;
  top: -60px;
  font-weight: 500;
  font-size: 18px;
  padding: 18px 24px 24px 24px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0px 0px 0px 1px #0e131809 inset;
  color: #909090;
  background-color: #fefefe;
}
.tab:hover {
  cursor: pointer;
}
#tasks-tab {
  left: 135px;
  content: "Tasks";
}
#content-tab {
  left: 247px;
  content: "Content";
}
.tab.active {
  color: #303030;
  background-color: #fafafa;
}
/* covering the drop shadow with active tabs  */
#tasks-tab.active.tab::before, #content-tab.active.tab::before {
  position: absolute;
  left: 1.5px;
  bottom: 0;
  content: "";
  height: 8px;
  width: calc(100% - 3px);
  background-color: #fafafa;
  z-index: 5;
}
/* /////////////// KANBAN BOARD //////////////////// */
/* COLUMNS */
div.column {
  position: relative;
  min-width: 280px;
  max-width: 332px;
  height: calc(100% - 108px);
  background-color: #eeeeee;
  margin: 36px 18px;
  border-radius: 18px;
  padding: 18px;
  scroll-behavior: smooth;
  scroll-snap-align: center;
}
div.column div.title {
  z-index: 2;
  background-color: #fafafa;
  padding: 12px 14px;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div.column div.title h3, div.column div.title input {
  font-weight: 500;
  font-size: 18px;
  color: #909090;
}
div.column div.title input {
  width: auto;
  background-color: transparent;
  border: none;
  padding: 2px;
  -webkit-text-decoration: underline dotted #909090;
          text-decoration: underline dotted #909090;
}
div.column div.title input:focus {
  text-decoration: none;
}
div.column div.title input.column-name:hover {
  cursor: text;
}
div.column div.cards {
  width: calc(100% - 12px);
  height: calc(100% - 60px);
  margin-top: 14px;
  padding-right: 12px;
  overflow-y: scroll;
  -ms-scroll-snap-type: y mandatory;
      scroll-snap-type: y mandatory;
}
div.column div.cards article.card {
  z-index: 10;
  width: calc(100% - 36px);
  border-radius: 16px;
  background-color: #fefefe;
  padding: 16px;
  filter: drop-shadow(0 0 2px #30303018);
  margin: 16px 0;
  scroll-behavior: smooth;
  scroll-snap-align: start;
}
div.column div.cards article.card svg.edit-icon {
  visibility: hidden;
}
div.column div.cards article.card:first-of-type {
  margin: 2px 0 0 0;
}
div.column div.cards article.card:hover > svg.edit-icon {
  visibility: visible;
}
div.column div.cards:hover {
  cursor: -webkit-grab;
  cursor: grab;
}
div.column:first-of-type {
  margin-left: 36px;
}
div.column:last-of-type {
  margin-right: 36px;
}
/* ///////////// SCROLL BAR //////////// */
div.cards::-webkit-scrollbar {
  width: 16px;
  /* width of the entire scrollbar */
}
div.cards::-webkit-scrollbar-track {
  background: transparent;
  /* color of the tracking area */
}
div.cards::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 4px solid #eeeeee;
  /* creates padding around scroll thumb */
}
#tasks::-webkit-scrollbar {
  width: 16px;
  /* width of the entire scrollbar */
}
#tasks::-webkit-scrollbar-track {
  background: #eeeeee;
  /* color of the tracking area */
}
#tasks::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 4px solid #eeeeee;
  /* creates padding around scroll thumb */
}
/* ///////////// DRAGGABLE //////////////// */
.draggable-source--is-dragging {
  opacity: 0.2;
  border: 2px dashed #909090;
  color: transparent;
}
.draggable-source--is-dragging * {
  color: transparent;
  background-color: transparent;
  border-color: transparent;
  fill: transparent;
  stroke: transparent;
}
.card.draggable-mirror {
  max-width: 296px;
}
/* ///////////// COMPONENTS /////////////// */
/* BUTTON FORMATTING */
.button {
  padding: 12px 18px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
/* adding a bit of space between the buttons */
.button:not(:last-child) {
  margin-right: 16px;
}
.button:hover {
  cursor: pointer;
}
.button.primary {
  color: #fefefe;
  background-color: #09997F;
}
.button.secondary {
  background-color: #e5e5e5;
}
.button.primary:hover {
  background-color: #09997fdc;
}
.button.secondary:hover {
  background-color: #dddddd;
}
.button.primary.icon {
  display: none;
}
#create-task-form {
  display: none;
  position: absolute;
  width: 80%;
  height: 80%;
  top: calc(10% - 18px);
  left: calc(10% - 18px);
  padding: 36px;
  flex-direction: column;
  background-color: #fefefe;
  border-radius: 16px;
}
#create-task-form input {
  border: none;
  filter: drop-shadow(0 0 2px #30303018);
  border-radius: 4px;
  padding: 12px;
}
#create-task-form input:focus {
  border: none;
  filter: drop-shadow(0 0 2px #30303048);
}
#create-task-form input[type=radio] {
  width: 0;
}
#create-task-form label.false-radio span {
  background-color: #fefefe;
  color: #909090;
  padding: 16px;
}
#create-task-form label.false-radio:hover {
  cursor: pointer;
}
#create-task-form label.false-radio:hover span {
  color: #303030;
}
#create-task-form input[type=radio]:checked ~ span {
  background-color: #303030;
  color: #fefefe;
}
#create-task-form label[for=taskPriorityRating] {
  display: flex;
  flex-direction: row;
}
#create-task-form.active {
  display: flex;
}
/* false stuff */
label, button#create-task-submit {
  display: block;
  margin-top: 1em;
}
/* /////////////////////////// RESPONSIVE CSS ////////////////////////////// */
@media only screen and (max-width: 700px) {
  /* LOGO/HOME-LINK */
  #home-link {
    display: none;
  }

  header {
    height: 48px;
  }

  /* STRUCTURE */
  #tasks-tab {
    left: 16px;
    content: "Tasks";
  }

  #content-tab {
    left: 118px;
    content: "Content";
  }

  /* /////////// COMPONENTS //////////// */
  /* BUTTON */
  .button-container {
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .button.primary.icon {
    display: flex;
    width: 48px;
    height: 48px;
  }

  .button.primary.icon:hover {
    background-color: #09997fdc;
  }

  .button:not(:last-child) {
    margin-right: 0;
    margin-bottom: 12px;
  }

  .button.create {
    background-color: #fefefe;
    color: #303030;
    visibility: hidden;
  }

  .button.create:hover {
    background-color: #e5e5e5;
  }
}