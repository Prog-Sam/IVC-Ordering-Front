import React from 'react';
import Branches from './branches.json';

const BranchService = () => {
  const getBranches = () => {
    return Branches;
  };
};

export default BranchService;
