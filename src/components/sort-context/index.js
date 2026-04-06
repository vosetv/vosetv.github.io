import React from 'react';

const Context = React.createContext({ filters: [], setFilter: (_filter) => {} });
export default Context;
