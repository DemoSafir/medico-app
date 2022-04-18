import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react'

export default function Popup(props) {
    const [title, children, openPopup, setOpenPopup] = props;
  return (
    <Dialog>
        <DialogTitle open={openPopup}>
            <div>title goes here.</div>
        </DialogTitle>
        <DialogContent>
            <div>content goes here.</div>
        </DialogContent>
    </Dialog>
  )
}
