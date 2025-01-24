export function Ejercicio1() {
    const styles = {
        hola: {
            width: '200px',
            height: '200px',
            backgroundColor: '#ffcd30', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px auto', 
            borderRadius: '10px', 
        },
        text: {
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
        }
    };

    return (
        <div style={styles.hola}>
            <p style={styles.text}>Hola mundo</p>
        </div>
    );
}