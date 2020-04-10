export const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 32,
      },
      paper: {
        height: '32',
        width: '32'
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
        textAlign: 'center'
      },
      habitBox: {
        margin: 4,
        backgroundColor: '#bdc3c7',
        height: 48,
        width: 48,
        flexShrink: 0
      },
      selectedHabitColor: {
        backgroundColor: '#27ae60'
      }
}); 