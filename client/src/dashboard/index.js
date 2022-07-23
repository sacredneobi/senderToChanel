import React, { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useAccessGet } from "@api";
import { correctRouter, useMinWidth } from "@utils";

import {
  Drawer,
  IconButton,
  Text,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Navigation,
  ContentRouter,
} from "@components";
import style from "./style";

function areEqual(prev, next) {
  return true;
}

export default memo((props) => {
  const { adminPages = [] } = props;

  const matches = useMinWidth();

  const [open, setOpen] = useState(true);
  const [access, setAccess] = useState({ route: [], routeSetting: [] });
  const [callbackGet, loading] = useAccessGet({ correctRouter, adminPages });

  useEffect(() => {
    callbackGet(setAccess);
  }, [callbackGet]);

  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  if (loading) return <div style={style}>LOADING...</div>;

  return (
    <Box sx={style.root}>
      <CssBaseline />
      <AppBar position="fixed" sx={style.appBar}>
        <Toolbar>
          <IconButton
            edge={false}
            sx={{ marginRight: 1 }}
            onClick={handleDrawerOpen}
            textIcon="home"
            name={t("dashboard.menu")}
          />
          <Text variant="h6" caption={t("dashboard.menu")} />
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        variant={matches ? "permanent" : "temporary"}
        onClose={handleDrawerOpen}
      >
        <Toolbar />
        <Navigation items={access?.route} />
        {access?.routeSetting && access?.routeSetting.length > 0 ? (
          <Navigation items={access?.routeSetting} fixedBottom />
        ) : null}
      </Drawer>
      <Box component="main" sx={style.boxMain(true)}>
        <ContentRouter
          routers={[
            ...(access?.route ? access.route : []),
            ...(access?.routeSetting ? access.routeSetting : []),
          ]}
        />
      </Box>
    </Box>
  );
}, areEqual);
