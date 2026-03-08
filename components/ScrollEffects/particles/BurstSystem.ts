import { Particle, ParticleSystem } from './types';

const BURST_COLORS = ['#C5A059', '#D4AF37', '#F5E6CC', '#E8D5A8', '#B89040'];

export class BurstSystem implements ParticleSystem {
  particles: Particle[] = [];
  private firedSections = new Set<string>();

  burst(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
      const speed = 3 + Math.random() * 5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1.2 + Math.random() * 0.5,
        size: 2 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        opacity: 0.8 + Math.random() * 0.2,
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
        phase: 0,
      });
    }
  }

  tryBurst(sectionId: string, x: number, y: number, count: number) {
    if (this.firedSections.has(sectionId)) return;
    this.firedSections.add(sectionId);
    this.burst(x, y, count);
  }

  spawn() { /* bursts are triggered explicitly */ }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.vy += 0.15; // gravity
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life -= dt / p.maxLife;
      p.opacity *= 0.98;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * Math.min(1, p.life * 4);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  activeCount() {
    return this.particles.length;
  }
}
