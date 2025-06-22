import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

import "./App.css";
import Header from "./components/Header";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar/app-sidebar";

function App() {
	const routing = useRoutes(routes);

	return (
		<SidebarProvider>
			<AppSidebar />
			
			{/* Outer container to center the layout horizontally */}
			<div className="w-full flex justify-center">
				{/* Your content with fixed width */}
				<div className="w-1/2 flex flex-col items-center py-4">
					<Header />
					<div className="w-full">{routing}</div>
					{/* <Footer /> */}
				</div>
			</div>
		</SidebarProvider>
	);
}

export default App;
