import ContentLoader from "react-content-loader";

const ConfigureLoader = () => {
  return (
    <div className="main--section configure--view">
      <ContentLoader
        speed={2}
        width="100%"
        height={550}
        viewBox="0 0 100% 550"
        backgroundColor="#DCDCDC"
        foregroundColor="#ECECEC"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100" />
        <rect x="0" y="120" rx="5" ry="5" width="100%" height="430" />
      </ContentLoader>
    </div>
  );
};

export default ConfigureLoader;
