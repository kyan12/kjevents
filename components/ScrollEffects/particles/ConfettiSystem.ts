import { Particle, ParticleSystem } from './types';

const GOLD_COLORS = ['#C5A059', '#D4AF37', '#F5E6CC', '#B89040', '#CDA84C'];
const POOL_SIZE = 30;

export class ConfettiSystem implements ParticleSystem {
  particles: Particle[] = [];

  constructor() {
    for (let i = 0; i < POOL_SIZE; i++) {
      this.particles.push({
        x: 0, y: 0, vx: 0, vy: 0,
        life: 0, maxLife: 0, size: 0,
        rotation: 0, rotationSpeed: 0, opacity: 0,
        color: GOLD_COLORS[0], phase: 0,
      });
    }
  }

  spawn(width: number, _height: number, velocity: number) {
    if (Math.abs(velocity) < 0.5) return;
    const count = Math.min(3, Math.floor(Math.abs(velocity) * 0.6));
    for (let i = 0; i < count; i++) {
      const dead = this.particles.find(p => p.life <= 0);
      if (!dead) break;
      dead.x = Math.random() * width;
      dead.y = -10;
      dead.vx = (Math.random() - 0.5) * 1.2;
      dead.vy = 0.8 + Math.random() * 1.5 + Math.abs(velocity) * 0.2;
      dead.life = 1;
      dead.maxLife = 2.5 + Math.random() * 2;
      dead.size = 3 + Math.random() * 5;
      dead.rotation = Math.random() * Math.PI * 2;
      dead.rotationSpeed = (Math.random() - 0.5) * 0.08;
      dead.opacity = 0.6 + Math.random() * 0.3;
      dead.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      dead.phase = Math.random() * Math.PI * 2;
    }
  }

  update(dt: number) {
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      p.x += p.vx;
      p.y += p.vy * dt * 60;
      p.rotation += p.rotationSpeed;
      p.life -= dt / p.maxLife;
      if (p.life < 0.3) p.opacity *= 0.93;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // 3D rotation simulated via scale oscillation
      const scaleX = Math.cos(p.phase + p.rotation * 2) * 0.5 + 0.5;
      ctx.scale(scaleX || 0.1, 1);
      ctx.globalAlpha = p.opacity * Math.min(1, p.life * 3);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
  }

  activeCount() {
    return this.particles.filter(p => p.life > 0).length;
  }
}
