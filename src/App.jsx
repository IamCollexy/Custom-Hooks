import React, { useEffect, useState } from 'react';

import Tasks from './components/Task/Tasks';
import NewTask from './components/New Task/NewTask';
import useHttp from './components/hooks/useHttp';


function App() {

  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest: fetchTasks} = useHttp();


// const transformTasks = useCallback((tasksObj) => {
  useEffect(() => {
const transformTasks = (tasksObj) => {

  const loadedTasks = [];

  for( const taskKey in tasksObj ) {
    loadedTasks.push ({ id: taskKey, text: tasksObj[taskKey].text });
  }
  setTasks(loadedTasks);
}


 
    fetchTasks( {url:  'https://react-practice-e9d43-default-rtdb.firebaseio.com/tasks.json'}, 
    transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}
;
export default App;
// import React from 'react';
// import BackwardCounter from './components/BackwardCounter';
// import ForwardCounter from './components/ForwardCounter';

// function App() {
//   return (
//     <React.Fragment>
//       <ForwardCounter />
//       <BackwardCounter />
//     </React.Fragment>
//   );
// }

// export default App;