module.exports = {
  apps: [{
    name: 'decorcake-bot',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    },
    // Reiniciar si hay errores
    restart_delay: 5000,
    // Máximo de reinicios por minuto
    max_restarts: 10,
    // Tiempo mínimo de ejecución antes de considerarlo "exitoso"
    min_uptime: '10s',
    // Logs
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    // Combinar logs
    merge_logs: true,
  }]
};
