
import React, { useEffect } from 'react';
import useTimeout from '../useTimeout/useTimeout';


// type Props = {
//   callback: () => void,
//   delay: number,
//   dependencies: any,
// }

const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}

export default useDebounce