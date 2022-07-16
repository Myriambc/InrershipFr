import React from "react";
import "./_divider.scss";
import { Grid } from "@material-ui/core";

export default function Divider({ title }) {
  return (
    <Grid item xs={12} container justifyContent="center" alignItems="center">
      <div class="col col-auto" id="dividerWrap">
        <div class="contentDivider">
          <div class="dividedText">
            <strong>{title}</strong>
          </div>
        </div>
      </div>
    </Grid>
  );
}
