export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 32,
  },
  paper: {
    height: '32',
    width: '32',
  },
  habitGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  habitLabel: {
    width: 'auto',
    height: 16,
    marginTop: 16,
    marginRight: 8,
    textAlign: 'center',
  },
  habitBox: {
    margin: 4,
    backgroundColor: '#eeeeee',
    height: 48,
    width: 48,
    flexShrink: 0,
  },
  selectedHabitColor: {
    backgroundColor: '#8cc665',
  },
  dateGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateHeader: {
    height: 48,
    width: 48,
    margin: 4,
    textAlign: 'center',
    flexShrink: 0,
  },
  today: {
    border: [[2, 'solid', '#8cc665']],
  },
});
