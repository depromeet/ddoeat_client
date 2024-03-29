const mergeRefs = <T = unknown>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.Ref<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

export default mergeRefs;
