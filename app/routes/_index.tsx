import type {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react'
import {parseLocations} from "~/domParser.server";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

// Add in a shadcn list component. The data you need will be on https://tommys-express.com/locations
// You'll need to find a way to store all the locations which can be found using
// document.querySelectorAll('.location')

export async function loader({request}: LoaderFunctionArgs) {
    const locationsHTML = await fetch('https://tommys-express.com/locations');

    return parseLocations(await locationsHTML.text());
}

export default function Index() {
    const data = useLoaderData<typeof loader>();

    console.log(data[0].address);

    return (
        <>
            <h1 className="text-3xl font-bold text-red-700 w-full items-center justify-center text-center">Tommy's Express Locations</h1>
            <Table>
                <TableCaption>Tommy's Express Locations</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Site Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                        <TableHead>Facebook Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((location) => (
                        <TableRow key={location.address}>
                            <TableCell>{location.name}</TableCell>
                            <TableCell>{location.address}</TableCell>
                            <TableCell>{location.lat}</TableCell>
                            <TableCell>{location.lng}</TableCell>
                            <TableCell>{location.facebookAddress}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
