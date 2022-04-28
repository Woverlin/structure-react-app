import ReactDOM from "react-dom";
import React from "react";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";

const Root = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <App />;
        </QueryClientProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));
