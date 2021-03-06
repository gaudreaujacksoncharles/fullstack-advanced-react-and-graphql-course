import { useRouter } from "next/dist/client/router";
import Pagination from "../../components/Pagination/";
import Products from "../../components/Products/";
import { ModuleTitle } from "../../components/Module/styles";
import PleaseSignIn from "../../components/PleaseSignIn";

export default function ProductsPage() {
    const { query } = useRouter()
    const page = parseInt(query.page)
    return (
        <PleaseSignIn>
            <ModuleTitle>
                Products
            </ModuleTitle>
            <Pagination page={page || 1} />
            <Products page={page || 1} />
            <Pagination page={page || 1} />
        </PleaseSignIn>
    )
}