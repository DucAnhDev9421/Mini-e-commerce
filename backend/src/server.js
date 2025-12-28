const config = require('./config/env'); // Load env first
const app = require('./app');

const PORT = config.port || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
