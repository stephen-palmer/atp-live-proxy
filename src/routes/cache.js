const express = require('express');
const cacheService = require('../services/cache');
const config = require('../config');
const webSocketServer = require('../websocket');

const router = express.Router();

/**
 * @swagger
 * /api/cache/stats:
 *   get:
 *     summary: Get cache statistics
 *     description: Retrieve statistics about the cache including hits, misses, and memory usage
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: Cache statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheStats'
 */
router.get('/cache/stats', (req, res) => {
  const stats = cacheService.getStats();
  res.json({
    stats,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @swagger
 * /api/cache/config:
 *   get:
 *     summary: Get cache configuration
 *     description: Retrieve the current cache configuration including endpoint-specific TTL values
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: Cache configuration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 defaultTtl:
 *                   type: integer
 *                   description: Default cache TTL in seconds
 *                 checkPeriod:
 *                   type: integer
 *                   description: Cache cleanup check period in seconds
 *                 endpoints:
 *                   type: object
 *                   description: Endpoint-specific TTL values
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/cache/config', (req, res) => {
  res.json({
    defaultTtl: config.cache.ttl,
    checkPeriod: config.cache.checkPeriod,
    endpoints: config.cache.endpoints,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @swagger
 * /api/cache/websocket:
 *   get:
 *     summary: Get WebSocket statistics
 *     description: Retrieve statistics about WebSocket connections and subscriptions
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: WebSocket statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connected:
 *                   type: boolean
 *                   description: Whether WebSocket server is running
 *                 connectedSockets:
 *                   type: integer
 *                   description: Number of connected WebSocket clients
 *                 subscriptions:
 *                   type: object
 *                   description: Subscription statistics
 *                 polling:
 *                   type: object
 *                   description: Polling service statistics
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/cache/websocket', (req, res) => {
  const stats = webSocketServer.getStats();
  res.json({
    ...stats,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router; 