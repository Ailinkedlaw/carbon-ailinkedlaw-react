/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import React, { forwardRef } from 'react';
 import PropTypes from 'prop-types';
 import { pkg } from '@/settings';
 
 const componentName = 'SelectMultiple';
 import Checkbox from '@mui/material/Checkbox';
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
  import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
  import CheckBoxIcon from '@mui/icons-material/CheckBox';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import CloseIcon from '@mui/icons-material/Close';

  import './_index.scss'
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const expandMoreIcon = <ExpandMoreIcon fontSize="small" />;
 
 export let SelectMultiple = forwardRef(
   (
     {
      size,
      limitTags,
      optionsProps,
      getOptionLabel,
      defaultValue,
      onChangeMul,
      onInputChange,
      label,
      placeholder,
      width,
      labelInValue,
      ...rest
     },
     ref
   ) => {
 
     return (
       <div>
         <Autocomplete
           multiple
           {...rest}
           id="checkboxes-tags-demo"
           options={optionsProps || []}
           disableCloseOnSelect
           getOptionLabel={getOptionLabel}
           renderOption={(props, option, { selected }) => {
             return (
               <li
                 {...props}
                 id="checkboxes-tags-li"
                 style={ 
                   {
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     display: '-webkit-box',
                     WebkitLineClamp: '1',
                     WebkitBoxOrient: 'vertical',
                     color: '#525252',
                     fontWeight: '400',
                     display: 'flex',
                     justifyContent: 'center',
                     paddingTop: '0px',
                     paddingBottom: '0px'
                   }
                 }>
                 <div style={ 
                   {
                     borderBottom: '1px solid #e0e0e0',
                     width: '100%'
                   }
                 }>
                   <Checkbox
                     icon={icon}
                     checkedIcon={checkedIcon}
                     style={{ marginRight: 8 }}
                     checked={selected}
                     defaultChecked
                     sx={{
                       color: '#161616',
                       '&.Mui-checked': {
                         color: '#161616',
                       },
                     }}
                   />
                   {option[labelInValue]}
                 </div>
               </li>
             )
           }
           }
           onChange={(event, newValue) => onChangeMul(event, newValue)}
           onInputChange={ (event, newInputValue) => {
             onInputChange(event, newInputValue)  
           }  
           }
           {...rest}
           style={{ width: width || 300, background: '#fff' }}
           popupIcon={expandMoreIcon}
           ChipProps={{
             deleteIcon: <CloseIcon fontSize="small" style={{color: '#fff', fontSize: '12px'}} sx={{ color: 'red' }} />,
             sx:[ {
               '&.MuiChip-root': {
                 background: '#161616',
                 color: '#fff',
                 height: '22px'
               },
             }]
           }}
           renderInput={(params) => (
             <TextField
               {...params}
               label={label}
               variant="standard"
               placeholder={placeholder}
             />
           )}
        />
       </div>
     );
   }
 );
 
 SelectMultiple = pkg.checkComponentEnabled(SelectMultiple, componentName);
 
 SelectMultiple.propTypes = {
   /**
    * 选择框默认文本
    */
    placeholder: PropTypes.string,
   /**
    * 限制标签数量
    * You can use the limitTags prop to limit the number of displayed options when not focused. integer,eg
    * limitTags = {1}
    */
    limitTags: PropTypes.any,
   /**
    * Array of options.
    */
    optionsProps: PropTypes.array,
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
 
 SelectMultiple.displayName = componentName;
 