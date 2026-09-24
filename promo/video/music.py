import numpy as np, wave
SR=44100; DUR=32.0; N=int(SR*DUR)
t=np.arange(N)/SR
L=np.zeros(N); R=np.zeros(N)
BEAT=0.6
def hz(m): return 440*2**((m-69)/12)
def env(n, a, d):
    e=np.ones(n); ai=int(a*SR); di=int(d*SR)
    if ai>0: e[:ai]=np.linspace(0,1,ai)
    if di>0: e[-di:]*=np.linspace(1,0,di)
    return e
def add(sig, start, gain=1.0, pan=0.0):
    i=int(start*SR); j=min(N,i+len(sig)); s=sig[:j-i]*gain
    L[i:j]+=s*(1-pan)/1.0*0.5*2**0.5*0.7071*1.414*(0.5 if pan>0 else 0.5)+s*0.5*(1-max(pan,0))
    R[i:j]+=s*0.5+s*0.5*(1-max(-pan,0))
def saw(f, n, det=0.0):
    tt=np.arange(n)/SR; out=np.zeros(n)
    for d in (-det,0,det):
        ph=(tt*f*(1+d))%1; out+=2*ph-1
    return out/3
# chords: Am, Bb, Gm, A (hijaz cadence), 4 beats each
prog=[[57,60,64,69],[58,62,65,70],[55,58,62,67],[57,61,64,69]]
bar=4*BEAT
# pad (sines + soft saw), whole piece
pad=np.zeros(N)
nb=int(DUR/bar)+1
for b in range(nb):
    ch=prog[b%4]; st=b*bar; n=int((bar+0.4)*SR)
    tt=np.arange(n)/SR
    s=np.zeros(n)
    for m in ch:
        f=hz(m-12)
        s+=np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*2.003*tt)+0.25*np.sin(2*np.pi*f*0.998*tt)
    s*=env(n,0.4,0.6)/len(ch)
    i=int(st*SR); j=min(N,i+n); pad[i:j]+=s[:j-i]
padvol=np.interp(t,[0,3.6,8,16,23.2,27.6,30,32],[0.35,0.45,0.35,0.4,0.55,0.6,0.5,0])
out=pad*padvol*0.5
# kick
def kick():
    n=int(0.45*SR); tt=np.arange(n)/SR
    f=50+120*np.exp(-tt*30); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.exp(-tt*7)
K=kick()
def hat():
    n=int(0.08*SR); return np.random.RandomState(1).randn(n)*np.exp(-np.arange(n)/SR*60)*np.linspace(1,1,n)
H=np.diff(hat(),prepend=0)
def place(sig,st,g):
    i=int(st*SR); j=min(N,i+len(sig))
    if i<N: out[i:j]+=sig[:j-i]*g
b=8.0
while b<23.2-0.01:
    place(K,b,0.9); b+=BEAT
b=3.6
while b<23.2:
    place(H,b+BEAT/2,0.12); b+=BEAT
b=16.0
while b<23.2:
    place(H,b+BEAT/4,0.06); place(H,b+3*BEAT/4,0.06); b+=BEAT
# bass
b=8.0; k=0
while b<23.2-0.01:
    ch=prog[int((b+1e-6)//bar)%4]; f=hz(ch[0]-24); n=int(BEAT*SR); tt=np.arange(n)/SR
    s=(np.sin(2*np.pi*f*tt)+0.3*saw(f,n))*env(n,0.005,0.2)*np.exp(-tt*2)
    place(s,b,0.45); b+=BEAT
# hijaz arpeggio (A hijaz: A Bb C# D E F G)
scale=[69,70,73,74,76,77,79,81]
pattern=[0,2,4,7,5,4,2,1,0,3,4,6,7,6,4,2]
b=8.0; k=0; step=BEAT/2
while b<23.2-0.01:
    m=scale[pattern[k%16]]+ (12 if b>=16 else 0)*0
    f=hz(m); n=int(0.35*SR); tt=np.arange(n)/SR
    s=(np.sin(2*np.pi*f*tt)*0.7+0.3*np.sign(np.sin(2*np.pi*f*tt)))*np.exp(-tt*9)
    place(s,b,0.16); b+=step; k+=1
# risers (noise sweep) into transitions
rs=np.random.RandomState(3)
for end,length in [(3.6,2.5),(8.0,1.5),(16.0,1.2),(23.2,1.8),(27.6,1.5)]:
    n=int(length*SR); noise=rs.randn(n); e=np.linspace(0,1,n)**2.5
    tt=np.arange(n)/SR; sweep=np.sin(2*np.pi*np.cumsum(200+1800*e)/SR)
    place(noise*e*0.12+sweep*e*0.08,end-length,1.0)
# impacts
def impact():
    n=int(2.5*SR); tt=np.arange(n)/SR
    boom=np.sin(2*np.pi*(40+60*np.exp(-tt*8))*tt)*np.exp(-tt*2.2)
    nz=np.random.RandomState(5).randn(n)*np.exp(-tt*6)*0.3
    return boom+nz
I=impact()
for s,g in [(3.6,0.9),(8.0,0.7),(16.0,0.6),(23.3,0.9),(24.5,0.8),(25.7,0.9),(27.6,1.0)]:
    place(I,s,g)
# final bell chord at 27.6
n=int(4.4*SR); tt=np.arange(n)/SR; bell=np.zeros(n)
for m in [57,64,69,73,76]:
    f=hz(m); bell+=np.sin(2*np.pi*f*tt)*np.exp(-tt*1.2)+0.3*np.sin(2*np.pi*f*2.76*tt)*np.exp(-tt*3)
place(bell/5,27.6,0.5)
# master fade + normalize + stereo width via slight delay
out*=np.interp(t,[0,0.3,30.5,32],[0,1,1,0])
out=np.tanh(out*1.2)
d=int(0.012*SR)
Lc=out; Rc=np.concatenate([np.zeros(d),out[:-d]])*0.3+out*0.7
st=np.stack([Lc,Rc],1); st/=np.max(np.abs(st))*1.12
w=wave.open('music.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
print('ok')
