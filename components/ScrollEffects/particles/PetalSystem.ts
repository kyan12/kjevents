import { Particle, ParticleSystem } from './types';

const PETAL_COLORS = [
  'rgba(180, 140, 140, 0.6)',
  'rgba(200, 160, 160, 0.5)',
  'rgba(220, 180, 180, 0.4)',
  'rgba(190, 150, 140, 0.5)',
  'rgba(210, 170, 160, 0.45)',
];

const POOL_SIZE = 30;

export class PetalSystem implements ParticleSystem {
  particles: Particle[] = [];

  constructor() {
    for (let i = 0; i < POOL_SIZE; i++) {
      this.particles.push(this.createDead());
    }
  }

  private createDead(): Particle {
    return {
      x: 0, y: 0, vx: 0, vy: 0,
      life: 0, maxLife: 0, size: 0,
      rotation: 0, rotationSpeed: 0, opacity: 0,
      color: PETAL_COLORS[0], phase: 0,
    };
  }

  spawn(width: number, _height: number, velocity: number) {
    if (Math.abs(velocity) < 0.5) return;
    const spawnCount = Math.min(3, Math.floor(Math.abs(velocity) * 0.8));
    for (let i = 0; i < spawnCount; i++) {
      const dead = this.particles.find(p => p.life <= 0);
      if (!dead) break;
      dead.x = Math.random() * width;
      dead.y = -20;
      dead.vx = (Math.random() - 0.5) * 0.6;
      dead.vy = 0.5 + Math.random() * 1.2 + Math.abs(velocity) * 0.3;
      dead.life = 1;
      dead.maxLife = 3 + Math.random() * 3;
      dead.size = 6 + Math.random() * 10;
      dead.rotation = Math.random() * Math.PI * 2;
      dead.rotationSpeed = (Math.random() - 0.5) * 0.03;
      dead.opacity = 0.4 + Math.random() * 0.3;
      dead.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      dead.phase = Math.random() * Math.PI * 2;
    }
  }

  update(dt: number) {
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      const elapsed = (1 - p.life / p.maxLife) * p.maxLife;
      p.x += p.vx + Math.sin(elapsed * 1.5 + p.phase) * 0.4;
      p.y += p.vy * dt * 60;
      p.rotation += p.rotationSpeed;
      p.life -= dt / p.maxLife;
      if (p.life < 0.2) p.opacity *= 0.95;
    }
  }

  draw(ctx: CanvasRenderingContext2D, _width: number, _height: number) {
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * Math.min(1, p.life * 3);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      // Teardrop / petal bezier shape
      ctx.moveTo(0, -p.size * 0.5);
      ctx.bezierCurveTo(
        p.size * 0.4, -p.size * 0.3,
        p.size * 0.35, p.size * 0.3,
        0, p.size * 0.5
      );
      ctx.bezierCurveTo(
        -p.size * 0.35, p.size * 0.3,
        -p.size * 0.4, -p.size * 0.3,
        0, -p.size * 0.5
      );
      ctx.fill();
      ctx.restore();
    }
  }

  activeCount() {
    return this.particles.filter(p => p.life > 0).length;
  }
}
