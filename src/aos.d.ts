declare module 'aos' {
  type AosOptions = {
    duration?: number;
    once?: boolean;
    offset?: number;
    easing?: string;
  };

  const AOS: {
    init: (options?: AosOptions) => void;
    refresh: () => void;
  };

  export default AOS;
}
