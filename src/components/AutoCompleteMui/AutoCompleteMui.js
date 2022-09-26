/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 import React, { forwardRef, useEffect, useState } from 'react'

 import PropTypes from 'prop-types';
 import { pkg } from '@/settings';
 
 const componentName = 'AutoCompleteMui';
 import TextField from '@mui/material/TextField';
 import Autocomplete from '@mui/material/Autocomplete';
 import CircularProgress from '@mui/material/CircularProgress';
 /**
 * @name Autocomplete
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function sleep (delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
 export let AutoCompleteMui = forwardRef(
   (
     {
      label, placeholder, onChange, onInputChangeProps,
  propsOptions, getOptionLabel, placeholderProps, isOptionEqualToValue, ...rest
     },
     ref
   ) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([...propsOptions]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('')
    const loading = open && options.length === 0;

    useEffect(() => {
      let active = true;
      if (!loading) {
        return undefined;
      }
      (async () => {
        await sleep(1e3); // For demo purposes.
        setOptions([...propsOptions])
        if (inputValue === '') {
          setOptions(value ? [value] : []);
          return undefined;
        }
        if (active) {
          let newOptions = [];

          if (value) {
            newOptions = [value];
          }
        }
      })();
      return () => {
        active = false;
      };
    }, [loading, value, inputValue, options]);

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
    useEffect(async () => {
      await sleep(1e3); // For demo purposes.
      if(value) {
        setOptions([...propsOptions])
      } else {
        setOptions([])
      }
    }, [propsOptions])
     return (
       <div>
         <Autocomplete
           filterOptions={(x) => x}
           autoComplete
           includeInputInList
           filterSelectedOptions
           id="asynchronous-demo"
           sx={{ width: 300, height: 40 }}
           open={open}
           onOpen={() => {
             setOpen(true);
           }}
           onClose={() => {
             setOpen(false);
           }}
           onChange={(event, newValue) => {
             onChange(event, newValue)
             setValue(newValue)
           }}
           onInputChange={ (event, newInputValue) => {
             onInputChangeProps(event, newInputValue)
             setInputValue(newInputValue)
           }  
           }
           {...rest}
           isOptionEqualToValue={isOptionEqualToValue}
           getOptionLabel={getOptionLabel}
           options={options}
           value={value}
           loading={loading}
           renderInput={(params) => (
             <TextField
               placeholder={placeholderProps}
               {...params}
               label={label}
               InputProps={{
                 ...params.InputProps,
                 endAdornment: (
                   <React.Fragment>
                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
                     {params.InputProps.endAdornment}
                   </React.Fragment>
                 ),
               }}
             />
           )}
        />
       </div>
     );
   }
 );
 
 AutoCompleteMui = pkg.checkComponentEnabled(AutoCompleteMui, componentName);
 
 AutoCompleteMui.propTypes = {
   /**
    * 选择框默认文本
    */
    placeholderProps: PropTypes.string,
   /**
    * 'small'| 'medium'| string
    * default 'medium'
    * The size of the autocomplete.
    */
    size: PropTypes.string,
   /**
    * Control the popup` open state.
    */
    open: PropTypes.bool,
   /**
    * If true, the first option is automatically highlighted.
    */
    autoHighlight: PropTypes.bool,
   /**
    * 如果被设置为 true，那么该组件将会被禁用。
    */
    disabled: PropTypes.bool,
   /**
    * The system prop that allows defining system overrides as well as additional CSS styles. See the `sx` page for more details.
    * `Array<func
  | object
  | bool>
  | func
  | object`
    */
    sx: PropTypes.array,
   /**
    * The value of the autocomplete.
      The value must have reference equality with the option in order to be selected. You can customize the equality behavior with the isOptionEqualToValue prop.
    */
    value: PropTypes.any,
   /**
    * If true, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
    */
    readOnly: PropTypes.bool,
   /**
    * The input value.
    */
    inputValue: PropTypes.string,
   /**
    * If true, the highlight can move to the input.
    */
    includeInputInList: PropTypes.bool,
   /**
    *  其它API请移步至 https://mui.com/zh/material-ui/api/autocomplete/
    */
    other: PropTypes.string,
 };
 
 AutoCompleteMui.displayName = componentName;
 