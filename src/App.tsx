import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

import "./App.css";
import Header from "./components/Header";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar/app-sidebar";
import ScrollToTop from "./components/utils/ScrollToTop";
import { Toaster } from "./components/ui/sonner";

function AppRoutes() {
	const element = useRoutes(routes);
	return element;
}

function App() {

	return (
		<SidebarProvider>
			<Toaster />
			<AppSidebar />

			{/* Outer container to center the layout horizontally */}
			<div className="w-full flex justify-center">
				{/* Your content with fixed width */}
				<div className="w-full md:w-2/3 flex flex-col items-center py-4">
					<Header />
					<ScrollToTop />
					<div className="w-full">
						<AppRoutes />
					</div>
					{/* <Footer /> */}
				</div>
			</div>
		</SidebarProvider>
	);
}

export default App;
