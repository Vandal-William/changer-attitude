const debug = (store) => (next) => (action) => {
    
    console.log(action);
    
    next(action);
  };
  
  export default debug;