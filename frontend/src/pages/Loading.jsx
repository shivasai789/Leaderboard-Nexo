import { ThreeDots } from "react-loader-spinner";

function Loading() {
  return (
    <div style={styles}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="black"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

const styles = {
  height: "100vh",
  position: "fixed",
  width: "100vw",
  backgroundColor: "#00000080",
  zIndex: "999",
  top: "0",
  left: "0",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default Loading;
