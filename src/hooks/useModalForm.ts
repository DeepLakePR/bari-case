import { useState } from "react";

type ModalFormResult = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function useModalForm(): ModalFormResult{

    const [ open, setOpen ] = useState<boolean>(false);

    return { open, setOpen };
}
