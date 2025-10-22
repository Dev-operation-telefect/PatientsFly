import { ClipLoader } from 'react-spinners';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
    <ClipLoader color="#7c3aed" size={50} />
  </div>
);

export default Loader;