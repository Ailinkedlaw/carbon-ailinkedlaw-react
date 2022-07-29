/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@carbon/react';
import { isColumnVisible } from './common';
import Columns from './Columns';
import Actions from './Actions';
import { pkg } from '@/settings';
import { concat } from 'lodash'

const blockClass = `${pkg.prefix}--datagrid`;

const CustomizeColumnsModal = ({
  isOpen,
  setIsModalOpen,
  onSaveColumnPrefs,
  columnDefinitions,
  originalColumnDefinitions,
  customizeModalHeadingLabel = 'Customize display',
  primaryButtonTextLabel = 'Save',
  secondaryButtonTextLabel = 'Cancel',
  instructionsLabel = 'Deselect columns to hide them. Click and drag the white box to reorder the columns. These specifications will be saved and persist if you leave and return to the data table.',
  findColumnPlaceholderLabel = 'Find column',
  resetToDefaultLabel = 'Reset to default',
}) => {
  const [searchText, setSearchText] = useState('');
  const [columnObjects, setColumnsObject] = useState(
    columnDefinitions
      // hide the columns without Header, e.g the sticky actions, spacer
      .filter((colDef) => !!colDef.Header.props)
      // only sort the hidden column to the end when modal reopen
      .sort((defA, defB) => {
        const isVisibleA = isColumnVisible(defA);
        const isVisibleB = isColumnVisible(defB);
        if (isVisibleA && !isVisibleB) {
          return -1;
        }
        if (!isVisibleA && isVisibleB) {
          return 1;
        }
        return 0;
      })
  );
  const [isDirty, setIsDirty] = useState(false);

  const onRequestClose = () => {
    setIsModalOpen(false);
  };
  const onRequestSubmit = () => {
    setIsModalOpen(false);
    const updatedColumns = columnObjects.map((colDef) => ({
      id: colDef.id,
      isVisible: colDef.isVisible,
      sticky: colDef?.sticky ?? null,
      Header: colDef.Header.props.title
    }));
    onSaveColumnPrefs(updatedColumns);
  };

  const onCheckboxCheck = (col, value) => {
    const changedDefinitions = columnObjects.map((definition) => {
      if (definition.id === col.id) {
        return { ...definition, isVisible: value };
      }
      return definition;
    });
    setColumnsObject(changedDefinitions);
    setDirty();
  };
  
  /**
   * @name 设置固定位置
   * @param col
   * @param value {String}
   */
  const onSticky = (col, value) => {
    const changedDefinitions = columnObjects.map((definition) => {
      if (definition.id === col.id) {
        return { ...definition, sticky: value };
      }
      return definition;
    });
    handleStickyPos(changedDefinitions)
    setDirty();
  }
  
  const handleStickyPos = (columnObjects) => {
    const dDefinitions = columnObjects.filter(i => !i.sticky)
    const stickyRight = columnObjects.filter(i => i.sticky === 'right')
    const stickyLeft = columnObjects.filter(i => i.sticky === 'left')
    setColumnsObject(concat(stickyLeft, dDefinitions, stickyRight));
  }
  

  const setDirty = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  const string = searchText.trim().toLowerCase();
  return (
    <Modal
      className={`${blockClass}__customize-columns-modal`}
      open={isOpen}
      modalHeading={customizeModalHeadingLabel}
      primaryButtonText={primaryButtonTextLabel}
      secondaryButtonText={secondaryButtonTextLabel}
      selectorPrimaryFocus={`.${blockClass}__customize-columns-column-list--focus`}
      primaryButtonDisabled={!isDirty}
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      size="sm"
      hasForm
    >
      <div className={`${blockClass}__customize-columns-instructions`}>
        {instructionsLabel}
      </div>
      <Actions
        findColumnPlaceholderLabel={findColumnPlaceholderLabel}
        resetToDefaultLabel={resetToDefaultLabel}
        columns={columnObjects}
        originalColumnDefinitions={originalColumnDefinitions}
        searchText={searchText}
        setColumnsObject={(cols) => {
          setColumnsObject(cols);
          setDirty();
        }}
        setSearchText={setSearchText}
      />
      {isOpen && (
        <Columns
          columns={columnObjects}
          filterString={string}
          onSelectColumn={onCheckboxCheck}
          onSticky={onSticky}
          setColumnsObject={(cols) => {
            setColumnsObject(cols);
            setDirty();
          }}
        />
      )}
    </Modal>
  );
};

CustomizeColumnsModal.propTypes = {
  columnDefinitions: PropTypes.array.isRequired,
  customizeModalHeadingLabel: PropTypes.string,
  instructionsLabel: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onSaveColumnPrefs: PropTypes.func.isRequired,
  originalColumnDefinitions: PropTypes.array.isRequired,
  primaryButtonTextLabel: PropTypes.string,
  secondaryButtonTextLabel: PropTypes.string,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default CustomizeColumnsModal;
