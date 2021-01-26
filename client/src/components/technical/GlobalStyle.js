import { createGlobalStyle } from "styled-components";
import style from "styled-theming";

const getBodyBackground = style("mode", {
  light: "#fff",
  dark: "#181818",
});
const getForeground = style("mode", {
  light: "#181818",
  dark: "#b7b7b7",
});
const getContentBackground = style("mode", {
  light: "#fff",
  dark: "#141414",
});
const getBorderColor = style("mode", {
  dark: "#9e9e9e",
});
const GlobalStyle = createGlobalStyle`
body {
  background-color: ${getBodyBackground};
  color: ${getForeground};
}
.card, .nav-wrapper, .sidenav, .MuiPaper-root, .dropdown-content, .datepicker-modal {
  background-color: ${getContentBackground} !important;
}

.collection .collection-item, .collection.with-header .collection-header, .collapsible-header {
  background-color: ${getContentBackground};
  border-color: ${getBorderColor};
}

.collection, .collection.with-header, .collapsible, .collapsible-body, button.MuiButton-outlined {
  border-color: ${getBorderColor};
}
 .MuiIconButton-root,
 .btn-flat,
 .MuiButton-label,
 .MuiButtonBase-root,
 li.MuiListItem-button,
 label.MuiFormLabel-root,
 .MuiAppBar-colorPrimary,
 svg.MuiSelect-icon,
 .MuiTypography-h6,
 .dropzone-content,
 .datepicker-day-button {
  color: ${getForeground};
}

.input-field .prefix.active,
.custom-input,
.chips .input,
.search,
.input-field input[type=search]:focus:not(.browser-default),
.sidenav li>a,
.datepicker {
  color: ${getForeground};
}
.MuiTypography-h6,
nav .brand-logo,
.nav-link,
.dropdown-content li>.nav-link,
.material-icons,
.sidenav li>a>i.material-icons {
  color: ${getForeground};
}
.input-field input[type=search] ~ .material-icons {
  color: ${getForeground} !important;
}
div.MuiInputBase-input, div.MuiInput-underline:before {
  color: ${getForeground};
  border-bottom: 1px solid ${getBorderColor};
}
.input-field input[type=search]:focus:not(.browser-default){
  background-color: ${getBodyBackground}
}
`;
export default GlobalStyle;
