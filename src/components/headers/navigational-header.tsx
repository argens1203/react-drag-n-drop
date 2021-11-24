import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

type Props = {
    id?: string;
    title?: string;
}
export function NavigationalHeader(props: Props){
    const {id, title} = props;
    console.log(`id: ${id}`);
    console.log(`title: ${title}`);
    const queries = [id, ]
    return (
        <Container>
            <CustomLink pathname='detail' title={title} id={id}/>
        </Container>
    )
}

type ExtendedProps = {
    pathname: string;
} & Props;

function CustomLink (props: ExtendedProps){
    const {title, id, pathname} = props;
    const params = getParams({
        title,
        id,
    });
    const search = params ? `?${params}` : undefined;
    return (
        <Link
            to={{
                pathname,
                search,
            }}
        >
            {pathname}
        </Link>
    )
}

function getParams (rec: Record<string, string | undefined>){
    return Object.
    entries(rec)
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`);
}