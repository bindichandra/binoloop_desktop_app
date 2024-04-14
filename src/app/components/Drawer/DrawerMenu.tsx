import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Image from "next/image";

const icons = [
  { src: "/binoloop.svg", alt: "", priority: true },
  { src: "/home.svg", alt: "home", priority: false },
  { src: "/folderOpen.svg", alt: "folderOpen", priority: false },
  { src: "/folder.svg", alt: "folder", priority: false },
  { src: "/plus.svg", alt: "plus", priority: false },
];

interface DrawerMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, setOpen }) => {
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Render Binoloop icon if the drawer is closed */}
      {!open && (
        <Button onClick={toggleDrawer} className="tw-mt-2">
          <Image src="/binoloop.svg" alt="Binoloop" width={40} height={40} />
        </Button>
      )}

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={true}
        onClose={toggleDrawer}
        variant="persistent"
        sx={{
          width: 100,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 100,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {icons.map((icon, index) => (
              <React.Fragment key={index}>
                <div className="tw-flex tw-items-center">
                  <ListItemButton>
                    <ListItemIcon>
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={60}
                        height={60}
                        priority={icon.priority}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </div>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
