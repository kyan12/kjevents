export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  phase: number;
}

export interface ParticleSystem {
  particles: Particle[];
  spawn(width: number, height: number, velocity: number): void;
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D, width: number, height: number): void;
  activeCount(): number;
}
