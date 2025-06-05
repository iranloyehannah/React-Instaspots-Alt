import Divider from "@mui/material/Divider";
const Footer = () => {
  return (
    <div>
      <Divider sx={{ my: 2, width:"96%",mx: "auto" }} />
      <footer
        className="footer sm:footer-horizontal footer-center h-20 text-black p-4"
        style={{ backgroundColor: "#FCF5E5" }}
      >
        <aside>
          <p>{new Date().getFullYear()}© Spots</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
