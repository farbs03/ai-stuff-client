import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      overflowX: "hidden"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}))
export default useStyles