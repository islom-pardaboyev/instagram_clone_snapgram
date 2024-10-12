import { Suspense } from "react";

const Loading = ()=>{
    return (
        <div>Loading...</div>
    )
}

const SuspenseComponent = ({children}: {children: JSX.Element})=> {
    return <Suspense fallback={<Loading/>}>{children}</Suspense>
}

export {Loading, SuspenseComponent}