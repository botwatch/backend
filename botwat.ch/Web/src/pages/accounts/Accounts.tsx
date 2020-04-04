import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import {IOldSchoolAccount} from "../../data/dto/IOldSchoolAccount";
import moment from "moment";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

interface Column {
    id: 'alias' | 'banTime' | 'exp' | 'sessions' | 'bantime';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {id: 'alias', label: 'Name', minWidth: 170},
    // {id: 'time', label: 'Time', minWidth: 100},
    // {id: 'exp', label: 'Experience', minWidth: 170,},
    // {id: 'sessions', label: 'Sessions', minWidth: 170},
    {id: 'banTime', label: 'Banned', minWidth: 170}
];
export default function Accounts() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [accounts, setAccounts] = React.useState<IOldSchoolAccount[]>([] as IOldSchoolAccount[]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        let user = authenticationService.currentUserValue;
        if (user != null) {
            if (user.token != null) {
                authenticationService.login(user.name, user.token).then(user => {
                    accountService.getAccounts().then(a => setAccounts(a));
                });
            }
        }
    }, []);

    const displayValue = (value: any) => {
        let date = moment(value);
        if (date.isValid()) {
            if (date.year() < 2000) return "No";
            return date.format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return value;
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length > 0 ?
                            accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {displayValue(value)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }) : <TableRow/>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={accounts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}