from pathlib import Path
import math,struct,json
out=Path('static/models/assembly')
def box(x0,y0,z0,x1,y1,z1):
 v=[(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]
 faces=[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
 return [(v[a],v[b],v[c]) for a,b,c,d in faces]+[(v[a],v[c],v[d]) for a,b,c,d in faces]
def cylinder(r,z0,z1,n=32):
 tris=[]
 for i in range(n):
  a=2*math.pi*i/n;b=2*math.pi*(i+1)/n
  p=(r*math.cos(a),r*math.sin(a));q=(r*math.cos(b),r*math.sin(b))
  u=(*p,z0);v=(*q,z0);w=(*q,z1);t=(*p,z1)
  tris.extend([(u,v,w),(u,w,t),((0,0,z0),v,u),((0,0,z1),t,w)])
 return tris
def write(name,tris):
 # tscircuit model coordinates use +Z above the board.
 vertices=[]; normals=[]
 for a,b,c in tris:
  u=[b[i]-a[i] for i in range(3)];v=[c[i]-a[i] for i in range(3)]
  n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
  length=math.sqrt(sum(t*t for t in n));n=[t/length for t in n]
  vertices.extend([a,b,c]); normals.extend([n,n,n])
 positions=b''.join(struct.pack('<3f',*v) for v in vertices)
 data=positions+b''.join(struct.pack('<3f',*v) for v in normals)
 colors={'screw':[0.65,0.65,0.68,1],'housing':[0.3,0.35,0.4,1],'cover':[0.6,0.7,0.8,0.35],'bracket':[0.65,0.65,0.68,1],'screen':[0.03,0.07,0.1,1]}
 gltf={'asset':{'version':'2.0','generator':'tscircuit assembly docs demo'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0}],'meshes':[{'primitives':[{'attributes':{'POSITION':0,'NORMAL':1},'material':0}]}],'materials':[{'pbrMetallicRoughness':{'baseColorFactor':colors[name],'metallicFactor':0.1,'roughnessFactor':0.65},'alphaMode':'BLEND' if name=='cover' else 'OPAQUE','doubleSided':True}],'buffers':[{'byteLength':len(data)}],'bufferViews':[{'buffer':0,'byteOffset':0,'byteLength':len(positions)},{'buffer':0,'byteOffset':len(positions),'byteLength':len(data)-len(positions)}],'accessors':[{'bufferView':0,'componentType':5126,'count':len(vertices),'type':'VEC3','min':[min(v[i] for v in vertices) for i in range(3)],'max':[max(v[i] for v in vertices) for i in range(3)]},{'bufferView':1,'componentType':5126,'count':len(normals),'type':'VEC3'}]}
 metadata=json.dumps(gltf,separators=(',',':')).encode();metadata+=b' '*((-len(metadata))%4)
 glb=struct.pack('<III',0x46546C67,2,12+8+len(metadata)+8+len(data))+struct.pack('<II',len(metadata),0x4E4F534A)+metadata+struct.pack('<II',len(data),0x004E4942)+data
 (out/f'{name}.glb').write_bytes(glb)
write('screw',cylinder(1.5,-6,0)+cylinder(2.8,0,2))
write('housing',box(-23,-18,-6,23,18,-4)+box(-23,-18,-4,-21,18,2)+box(21,-18,-4,23,18,2)+box(-21,-18,-4,21,-16,2)+box(-21,16,-4,21,18,2))
write('cover',box(-23,-18,0,23,18,1.5))
write('bracket',box(-4,-4,0,4,4,1)+box(-4,3,1,4,4,9))
write('screen',box(-13.35,2,0,13.35,21.26,1.45)+box(-7.5,0,0,7.5,2,0.3))
