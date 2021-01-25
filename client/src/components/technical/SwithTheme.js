import {React, useState, useContext, useEffect} from "react";
import {Icon} from "react-materialize";
import {ThemeContext} from "styled-components";
const SwitchTheme = () => {
    const theme = useContext(ThemeContext);
    const [switchChecked, setSwitchChecked] = useState(theme.mode === "dark"? false : true) 
    const changeHandler = () => {
        theme.swapTheme();
      }
      useEffect(() => {
          theme.mode === "dark"? setSwitchChecked(false) : setSwitchChecked(true);
      }, [theme])
      return (
        <div className="switch">
        <label>
          <Icon>brightness_4</Icon>
          <input type="checkbox" checked={switchChecked} onChange={changeHandler}/>
          <span className="lever"></span>
          <Icon>brightness_5</Icon>
        </label>
      </div>
      )
}
export default SwitchTheme;