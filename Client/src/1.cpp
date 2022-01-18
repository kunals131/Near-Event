#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define iofile freopen("input.txt","r" , stdin); freopen("output.txt", "w", stdout);
#define ar array
#define ll long long
#define vi vector<int>
#define vl vector<ll>
#define v2i(n,m) vector<vector<int>>v(n,vector<int>(m))
#define vin(v) for(auto &x : v) cin>>x
#define forl(k,n) for(int i = k ; i<n; ++i)
#define mapi map<int,int> 
#define seti set<int,int> 
#define rall(v) v.rbegin(), v.rend()
#define ckmax(ans,max) ans = max(ans,max);
#define ckmin(ans,mix) ans = min(ans,min);
#define deqi deque<int>
#define vm(x) vector<array<int,x>> 
#define vsum(v,sum) for(auto x : v) sum+=x 
#define fastio ios_base::sync_with_stdio(0);     cin.tie(0); cout.tie(0);
const int MAX_N = 1e5 + 1;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
#define intl ll
#define debugv(v)  cout<<"[ "; for(auto x : v) cout<<x<<" "; cout<<"]\n";
#define debug(n) cout<<"[ "<<n<<" ]\n";
#define all(v) v.begin(), v.end()
#define fail(x) {cout<<x<<"\n"; return;}

   


void solve() {
    int n,k; cin>>n>>k;
    string s; cin>>s;
    if (n==k) fail(1)
    map<char,int> mp;
    int MaxLen = n/k;
    for(auto x : s) {
        mp[x]++;
    }
    if (mp.size()==s.length()) fail(1)
    if (mp.size()==1) fail(n/k);
    vector<int> lengths;
    int zx = k;
    int lens = 0;
    
        for(auto x : mp) {
            while(x.second>=2) {
                x.second-=2,lens+=2;
                if (lens==MaxLen) {
                    lengths.push_back(lens);
                    lens = 0;
                }
            }
        }
        if (lens>0) {
            for(auto x : mp) {
                if (x.second>=1) {lens+=1; break;}
            }
            lengths.push_back(lens);
        }
    
    if (lengths.size()<k) fail(1)
    sort(all(lengths));
    fail(lengths[0])


}


int main() {
    fastio;
    int tc = 1;
    cin >> tc;
    for (int t = 1; t <= tc; t++) {
        //cout<<"Case #"<<t<<"\n";
        solve();
    }
}