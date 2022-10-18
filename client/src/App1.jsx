import useCounter from "./hooks/useCounter";

function App() {
  const counter = useCounter({
    higherLimit: 10,
    lowerLimit: 0,
    initial: 0,
    steps: 2,
  });
  const counter2 = useCounter({
    higherLimit: 8,
    lowerLimit: 1,
    initial: 0,
    steps: 5,
  });

  return (
    <div className="text-center my-20">
      <CounterApp counter={counter} />
      <CounterApp counter={counter2} />
    </div>
  );
}

export default App;

const CounterApp = (props) => {
  const { counter } = props;
  return (
    <div className="counter1 mb-10">
      <h1 className="text-3xl font-bold text-red-500">{counter.count}</h1>
      <div className="btn-group flex gap-3 items-center justify-center mt-4">
        <button
          onClick={counter.handleInc}
          className="py-2 px-5 bg-gray-100 rounded text-gray-500 text-sm hover:bg-gray-800 hover:text-white"
        >
          Increment
        </button>
        <button
          onClick={counter.handleDec}
          className="py-2 px-5 bg-gray-100 rounded text-gray-500 text-sm hover:bg-gray-800 hover:text-white"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
